import { AxiosRequestConfig } from 'axios';
import { apiInstance } from './axiosInterceptors';
import { trackPromise } from 'react-promise-tracker';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const BaseService = {
	async getData(query: string | undefined, config?: AxiosRequestConfig, track = true): Promise<unknown> {
		if (!query) return null;
		const base_query = `3/search/movie?api_key=${API_KEY}&query=${query}`;
		if (track) {
			const promise = new Promise((resolve, reject) => {
				trackPromise(apiInstance.get(base_query, config))
					.then((response) => {
						resolve(response?.data || response);
					})
					.catch((error) => {
						reject(error);
					});
			});
			return promise;
		} else {
			const response = await apiInstance.get(base_query, config);
			return response?.data || response;
		}
	}
};
