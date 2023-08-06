import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const BASE_URL = `https://api.themoviedb.org/`;

export const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
  
    return config;
  },
  (error) => {
    console.log('errorReq', error.message);
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<AxiosError>) => {
    console.log('errorRes', error.message);
    return Promise.reject(error);
  }
);
