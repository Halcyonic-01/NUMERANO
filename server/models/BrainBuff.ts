import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBrainBuffOption {
    id: string;
    text: string;
}

export interface IBrainBuff extends Document {
    weekId: string;
    title: string;
    category: 'Number Theory' | 'Geometry' | 'Logic' | 'Probability' | 'Mixed';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    question: string;
    options: IBrainBuffOption[];
    correctAnswer: string;
    explanation: string;
    hint?: string;
    timeLimit: number;
    active: boolean;
    createdAt: Date;
    expiresAt: Date;
}

const BrainBuffSchema: Schema = new mongoose.Schema({
    weekId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Number Theory', 'Geometry', 'Logic', 'Probability', 'Mixed']
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        id: { type: String, required: true },
        text: { type: String, required: true }
    }],
    correctAnswer: {
        type: String,
        required: true,
        uppercase: true
    },
    explanation: {
        type: String,
        required: true
    },
    hint: {
        type: String
    },
    timeLimit: {
        type: Number,
        default: 300
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const BrainBuff: Model<IBrainBuff> = mongoose.model<IBrainBuff>('BrainBuff', BrainBuffSchema);

export default BrainBuff;
