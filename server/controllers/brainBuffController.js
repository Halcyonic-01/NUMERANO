const BrainBuff = require('../models/BrainBuff');
const { generateBrainBuffQuestion } = require('../services/geminiService');

const { getWeekId } = require('../utils/dateHelpers');

const getCurrentBrainBuff = async (req, res) => {
    try {
        const currentDate = new Date();

        // 1. Try to find active question that hasn't expired
        let brainBuff = await BrainBuff.findOne({
            active: true,
            expiresAt: { $gt: currentDate }
        });

        // 2. If no active question, generate one
        if (!brainBuff) {
            console.log('No active BrainBuff found. Generating new one...');

            try {
                // Generate question via Gemini
                const generatedData = await generateBrainBuffQuestion('Medium');

                const weekId = getWeekId();
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7); // Expire in 7 days

                // Deactivate any old active ones (cleanup)
                await BrainBuff.updateMany({ active: true }, { active: false });

                brainBuff = await BrainBuff.create({
                    weekId,
                    ...generatedData,
                    active: true,
                    expiresAt: nextWeek
                });

            } catch (genError) {
                console.error('Generation failed, looking for any fallback:', genError);
                // Fallback: Find MOST RECENT question even if expired
                brainBuff = await BrainBuff.findOne().sort({ createdAt: -1 });

                if (!brainBuff) {
                    return res.status(503).json({
                        message: 'BrainBuff service unavailable and no cached questions.'
                    });
                }
            }
        }

        res.json(brainBuff);

    } catch (error) {
        console.error('Error in getCurrentBrainBuff:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const forceGenerateBrainBuff = async (req, res) => {
    // Admin/Testing endpoint to force generation
    try {
        const generatedData = await generateBrainBuffQuestion('Medium');
        const weekId = getWeekId() + '-' + Date.now(); // Unique for testing

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
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCurrentBrainBuff, forceGenerateBrainBuff };
