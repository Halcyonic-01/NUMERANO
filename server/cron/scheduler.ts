import cron from 'node-cron';
import BrainBuff from '../models/BrainBuff';
import { generateBrainBuffQuestion } from '../services/geminiService';

const getWeekNumber = (d: Date): number => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
};

const initScheduler = (): void => {
    // Run every Monday at 00:00
    cron.schedule('0 0 * * 1', async () => {
        console.log('Running weekly BrainBuff rotation...');

        try {
            await BrainBuff.updateMany({ active: true }, { active: false });

            const generatedData = await generateBrainBuffQuestion('Medium');

            const now = new Date();
            const weekId = `${now.getFullYear()}-W${getWeekNumber(now).toString().padStart(2, '0')}`;

            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);

            await BrainBuff.create({
                weekId,
                ...generatedData,
                active: true,
                expiresAt: nextWeek
            });

            console.log('Weekly BrainBuff rotated successfully.');
        } catch (error) {
            console.error('Weekly rotation failed:', error);
        }
    });
};

export default initScheduler;
