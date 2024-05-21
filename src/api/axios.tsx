import axios, { AxiosInstance } from 'axios';

const getToken = (): string | null => {
    return localStorage.getItem('token');
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.0.42:8000/api/',
    // withCredentials: true,
});

axiosInstance.interceptors.request.use((configs: any) => {
    return {
        ...configs,
        headers: {
            ...configs.headers,
            Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
        },
    };
});

export { axiosInstance as request };
