import { Request, Response } from 'express';
import BrainBuff, { IBrainBuff } from '../models/BrainBuff';
import { generateBrainBuffQuestion } from '../services/geminiService';

const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNr = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dayNr + 3);
    const firstThursday = d.valueOf();
    d.setMonth(0, 1);
    if (d.getDay() !== 4) {
        d.setMonth(0, 1 + ((4 - d.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - d.valueOf()) / 604800000);
};

const getCurrentWeekId = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    return `${year}-W${week.toString().padStart(2, '0')}`;
};

export const getCurrentBrainBuff = async (req: Request, res: Response): Promise<void> => {
    try {
        const currentDate = new Date();

        let brainBuff: IBrainBuff | null = await BrainBuff.findOne({
            active: true,
            expiresAt: { $gt: currentDate }
        });

        if (!brainBuff) {
            console.log('No active BrainBuff found. Generating new one...');

            try {
                const generatedData = await generateBrainBuffQuestion('Medium');
                const weekId = getCurrentWeekId();
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);

                await BrainBuff.updateMany({ active: true }, { active: false });

                brainBuff = await BrainBuff.create({
                    weekId,
                    ...generatedData,
                    active: true,
                    expiresAt: nextWeek
                });
            } catch (genError) {
                console.error('Generation failed, looking for any fallback:', genError);
                brainBuff = await BrainBuff.findOne().sort({ createdAt: -1 });

                if (!brainBuff) {
                    res.status(503).json({
                        message: 'BrainBuff service unavailable and no cached questions.'
                    });
                    return;
                }
            }
        }

        res.json(brainBuff);
    } catch (error) {
        console.error('Error in getCurrentBrainBuff:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const forceGenerateBrainBuff = async (req: Request, res: Response): Promise<void> => {
    try {
        const generatedData = await generateBrainBuffQuestion('Medium');
        const weekId = getCurrentWeekId() + '-' + Date.now();

        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);

        await BrainBuff.updateMany({ active: true }, { active: false });

        const brainBuff = await BrainBuff.create({
            weekId,
            ...generatedData,
            active: true,
            expiresAt: nextWeek
        });

        res.json(brainBuff);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
