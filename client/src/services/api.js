import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
// Remove trailing slash if present to prevent double slashes
const cleanBaseURL = baseURL?.endsWith('/') ? baseURL.slice(0, -1) : baseURL;

const api = axios.create({
    baseURL: cleanBaseURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
