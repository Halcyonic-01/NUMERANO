export interface TeamMember {
    name: string;
    role: string;
    photo: string;
    quote: string;
}

export interface Team {
    id: string;
    name: string;
    icon: string;
    color: string;
    head: TeamMember;
    members?: TeamMember[];
}

export interface ClubLeadership {
    head: TeamMember;
    coHead: TeamMember;
}
