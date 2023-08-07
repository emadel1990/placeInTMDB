import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const BASE_URL = `https://api.themoviedb.org/`;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const apiInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		['Authorization']: 'Bearer ' + API_KEY
	}
});

apiInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		/* config.headers['Authorization'] = 'Bearer ' + import.meta.env.VITE_TMDB_API_KEY; */
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
