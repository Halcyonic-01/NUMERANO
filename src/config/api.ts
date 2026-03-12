const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
    brainBuff: {
        current: `${API_BASE_URL}/api/brainbuff/current`,
        generate: `${API_BASE_URL}/api/brainbuff/generate`
    },
    feedback: `${API_BASE_URL}/api/feedback`,
    health: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
