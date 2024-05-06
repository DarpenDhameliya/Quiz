import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const getToken = (): string | null => {
    return localStorage.getItem('token');
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    // baseURL: 'http://192.168.29.141:8000/api/',
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
// axiosInstance.interceptors.request.use((config: any) => {
//     const token = getToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export { axiosInstance as request };
