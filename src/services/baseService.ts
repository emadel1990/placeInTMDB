import { AxiosRequestConfig } from 'axios';
import { apiInstance } from './axiosInterceptors';
import { trackPromise } from 'react-promise-tracker';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const BaseService = {
	async getData(query: string | undefined, config?: AxiosRequestConfig, track = true): Promise<unknown> {
		if (!query) return null;
		if (track) {
			const promise = new Promise((resolve, reject) => {
				trackPromise(apiInstance.get(`${query}&api_key=${API_KEY}`, config))
					.then((response) => {
						resolve(response?.data || response);
					})
					.catch((error) => {
						reject(error);
					});
			});
			return promise;
		} else {
			const response = await apiInstance.get(`${query}&api_key=${API_KEY}`, config);
			return response?.data || response;
		}
	}
};
