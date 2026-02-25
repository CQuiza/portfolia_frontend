import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const apiService = {
    chat: (message, conversationId) =>
        api.post('/chat', { message, conversation_id: conversationId, include_sources: true }),

    uploadFile: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/documents/upload_file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    resetSystem: () => api.delete('/documents/reset'),

    getStats: () => api.get('/documents/stats'),
};

export default api;
