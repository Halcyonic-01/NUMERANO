import { API_ENDPOINTS } from '../config/api';

export interface BrainBuffOption {
    id: string;
    text: string;
}

export interface BrainBuffData {
    _id: string;
    weekId: string;
    title: string;
    category: string;
    difficulty: string;
    question: string;
    options: BrainBuffOption[];
    correctAnswer: string;
    explanation: string;
    hint?: string;
    timeLimit: number;
    active: boolean;
    createdAt: string;
    expiresAt: string;
}

export const getCurrentBrainBuff = async (): Promise<BrainBuffData> => {
    const response = await fetch(API_ENDPOINTS.brainBuff.current);
    if (!response.ok) {
        throw new Error('Failed to fetch BrainBuff');
    }
    return response.json();
};
