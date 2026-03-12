const cron = require('node-cron');
const BrainBuff = require('../models/BrainBuff');
const { generateBrainBuffQuestion } = require('../services/geminiService');
const { getWeekId } = require('../utils/dateHelpers');

const initScheduler = () => {
    // Run every Monday at 00:00
    cron.schedule('0 0 * * 1', async () => {
        console.log('Running weekly BrainBuff rotation...');

        try {
            // Deactivate all
            await BrainBuff.updateMany({ active: true }, { active: false });

            // Generate new
            const generatedData = await generateBrainBuffQuestion('Medium');

            const now = new Date();
            const weekId = getWeekId(now);

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
            // Retry logic could go here
        }
    });
};

module.exports = initScheduler;
