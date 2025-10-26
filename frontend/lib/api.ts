import axios from 'axios';
import Router from 'next/router';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
});

const apiPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
});



let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

function onRefreshed() {
    refreshSubscribers.forEach(cb => cb());
    refreshSubscribers = [];
}



api.interceptors.response.use(
    res => res,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await apiPublic.post('/auth/refresh');

                    isRefreshing = false;
                    onRefreshed();
                    return api(original);
                } catch (err) {
                    isRefreshing = false;
                    window.location.href = '/login';
                    return Promise.reject(err);
                }
            }

            return new Promise((resolve) => {
                refreshSubscribers.push(() => {
                    resolve(api(original));
                });
            });
        }
        return Promise.reject(error);
    }
);

export default api;