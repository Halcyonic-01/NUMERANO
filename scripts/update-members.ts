import xlsx from 'xlsx';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const teamDataPath = path.join(rootDir, 'src', 'data', 'teamData.ts');
const publicTeamDir = path.join(rootDir, 'public', 'team');

// Ensure public/team exists
if (!existsSync(publicTeamDir)) {
    mkdirSync(publicTeamDir, { recursive: true });
}

interface ExcelRow {
    Name?: string;
    Team?: string;
    "Position in club"?: string;
    Tagline?: string;
    Photo?: string;
}

// Map from team name to color info to keep the UI styles intact
const teamConfigs: Record<string, { id: string; icon: string; color: string }> = {
    "Emcee": { id: "emcee", icon: "", color: "from-blue-400 to-cyan-400" },
    "Media": { id: "media", icon: "", color: "from-cyan-400 to-teal-400" },
    "PR": { id: "pr", icon: "", color: "from-sky-400 to-blue-500" },
    "Public Relations": { id: "pr", icon: "", color: "from-sky-400 to-blue-500" },
    "Tech": { id: "tech", icon: "", color: "from-indigo-400 to-blue-600" },
    "Technical": { id: "tech", icon: "", color: "from-indigo-400 to-blue-600" },
    "Organising": { id: "organising", icon: "", color: "from-blue-500 to-indigo-500" }
};

// Utility to download image from gdrive link
async function downloadImage(gdriveUrl: string, destFilename: string): Promise<string | null> {
    if (!gdriveUrl || typeof gdriveUrl !== 'string') return null;

    try {
        // Handle common variations of Google Drive links
        let fileId = null;
        const dMatch = gdriveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        const idMatch = gdriveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);

        if (dMatch) fileId = dMatch[1];
        else if (idMatch) fileId = idMatch[1];

        if (!fileId) return null;

        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const destPath = path.join(publicTeamDir, destFilename);

        // Fetch image
        const response = await fetch(downloadUrl);
        if (!response.ok) {
            console.error(`Failed to fetch image for ${destFilename}: ${response.statusText}`);
            return null;
        }

        const arrayBuffer = await response.arrayBuffer();
        await fs.writeFile(destPath, Buffer.from(arrayBuffer));
        return `/team/${destFilename}`;

    } catch (error) {
        console.error(`Error downloading image for ${destFilename}:`, error);
        return null;
    }
}

function sanitizeFilename(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.jpg';
}

async function run() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Please provide the path to the Excel file.");
        console.error("Usage: npm run update-members <path-to-excel>");
        process.exit(1);
    }

    const excelPath = path.resolve(process.cwd(), args[0]);
    if (!existsSync(excelPath)) {
        console.error(`File not found: ${excelPath}`);
        process.exit(1);
    }

    console.log(`Reading Excel file: ${excelPath}`);
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: ExcelRow[] = xlsx.utils.sheet_to_json(sheet);

    console.log(`Found ${rows.length} rows.`);

    // Deduplicate by Name
    const uniqueRows: ExcelRow[] = [];
    const seenNames = new Set<string>();

    for (const row of rows) {
        if (!row.Name) continue;
        const normalizedName = row.Name.trim().toLowerCase();
        if (seenNames.has(normalizedName)) continue;

        seenNames.add(normalizedName);
        uniqueRows.push(row);
    }
    console.log(`Processing ${uniqueRows.length} unique members.`);

    let clubHead = null;
    let clubCoHead = null;
    const teamGroups: Record<string, { head: any, members: any[] }> = {};

    // Grouping by team
    for (const row of uniqueRows) {
        const name = row.Name?.trim();
        const team = row.Team?.trim();
        const role = row["Position in club"]?.trim();
        const quote = row.Tagline?.trim() || "";
        const photoLink = row.Photo?.trim() || "";

        if (!name || !role) continue; // Skip empty rows

        const filename = sanitizeFilename(name);

        console.log(`Processing: ${name}`);
        let photoPath = null;
        if (photoLink) {
            photoPath = await downloadImage(photoLink, filename);
        }

        const memberObj = {
            name,
            role,
            photo: photoPath || `/team/${filename}`, // fallback 
            quote
        };

        const r = role.toLowerCase();
        const isHarni = name.toLowerCase() === "harni r";
        const isTanishq = name.toLowerCase().includes("tanishq");

        // Overrides
        if (isHarni) memberObj.role = "Club Head";
        if (isTanishq) memberObj.role = "Tech Head & Co-Head";

        if (memberObj.role === "Club Head") {
            clubHead = memberObj;
        } else if (memberObj.role === "Club Co-Head" || isTanishq) {
            clubCoHead = memberObj;
            // Also add Tanishq to Tech team as Head
            if (isTanishq) {
                const targetTeam = "Technical";
                if (!teamGroups[targetTeam]) teamGroups[targetTeam] = { head: null, members: [] };
                teamGroups[targetTeam].head = memberObj;
            }
        } else if (team) {
            if (!teamGroups[team]) {
                teamGroups[team] = { head: null, members: [] };
            }

            const isLeader = (r.includes("head") || r.includes("lead")) && !r.includes("co-head") && !r.includes("co-lead");

            if (isLeader) {
                teamGroups[team].head = memberObj;
            } else {
                teamGroups[team].members.push(memberObj);
            }
        }
    }

    // Default fallbacks if missing
    if (!clubHead) {
        clubHead = { name: "[Head Name]", role: "Club Head", photo: "/team/head.jpg", quote: "[Quote here]" };
    }
    if (!clubCoHead) {
        clubCoHead = { name: "[Co-Head Name]", role: "Club Co-Head", photo: "/team/co-head.jpg", quote: "[Quote here]" };
    }

    // Sequence override for Organising team
    if (teamGroups["Organising"] && teamGroups["Organising"].members) {
        const sequenceNames = ["shakshi", "khushi", "dania", "daniya", "rakshitha", "rakashita", "inaya"];
        const members = teamGroups["Organising"].members;

        const sequencedMembers = [];
        const otherMembers = [];

        // Distinguish members based on if they are in the sequence array
        for (const m of members) {
            const lowName = m.name.toLowerCase();
            const isInSequence = sequenceNames.some(seq => lowName.includes(seq));
            if (isInSequence) {
                sequencedMembers.push(m);
            } else {
                otherMembers.push(m);
            }
        }

        // Sort sequence members according to the order defined in sequenceNames
        sequencedMembers.sort((a, b) => {
            const aIdx = sequenceNames.findIndex(seq => a.name.toLowerCase().includes(seq));
            const bIdx = sequenceNames.findIndex(seq => b.name.toLowerCase().includes(seq));
            return aIdx - bIdx;
        });

        // For "the rest all random", let's shuffle the others
        for (let i = otherMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [otherMembers[i], otherMembers[j]] = [otherMembers[j], otherMembers[i]];
        }

        // Put sequence first, then random others
        teamGroups["Organising"].members = [...sequencedMembers, ...otherMembers];
    }

    // Build teams array string
    const generatedTeams = Object.keys(teamGroups).map(teamName => {
        const config = teamConfigs[teamName] || { id: teamName.toLowerCase().replace(/\s/g, '-'), icon: "", color: "from-gray-400 to-gray-600" };
        const g = teamGroups[teamName];

        const headObj = g.head || { name: `[${teamName} Lead]`, role: `${teamName} Lead`, photo: `/team/${config.id}-head.jpg`, quote: "[Quote here]" };

        return `    {
        id: "${config.id}",
        name: "${teamName}",
        icon: "${config.icon}",
        color: "${config.color}",
        head: ${JSON.stringify(headObj, null, 12).replace(/\n\s*/g, ' ')},
        members: ${JSON.stringify(g.members, null, 8)}
    }`;
    });

    const fileContent = `import { Team, ClubLeadership } from '../types/team';

// Auto-generated Club Leadership
export const clubLeadership: ClubLeadership = {
    head: ${JSON.stringify(clubHead, null, 4)},
    coHead: ${JSON.stringify(clubCoHead, null, 4)}
};

// Auto-generated Teams Data
export const teams: Team[] = [
${generatedTeams.join(',\n')}
];
`;

    await fs.writeFile(teamDataPath, fileContent);
    console.log(`\nSuccess! Updated ${teamDataPath}`);
}

run().catch(console.error);
