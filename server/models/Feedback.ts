import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
    rating: number;
    relevance: string;
    difficulty: string;
    participation: string;
    nextTopic: string;
    description?: string;
    name?: string;
    email?: string;
    createdAt: Date;
}

const feedbackSchema: Schema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    relevance: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    participation: {
        type: String,
        required: true
    },
    nextTopic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    // New fields
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IFeedback>('Feedback', feedbackSchema);
