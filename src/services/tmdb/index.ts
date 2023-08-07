import { BaseService } from '../baseService';
import axios, { AxiosRequestConfig } from 'axios';
import { trackPromise } from 'react-promise-tracker';

export const tmdbService = {
	async searchMovies(query: string | undefined, page: string | undefined, track: boolean): Promise<any> {
		if (!query) return null;
		const base_query = `3/search/movie?query=${query}`;
		if (page) {
			const response = await BaseService.getData(`${base_query}&page=${page}`, {}, track);
			return response;
		} else {
			const response = await BaseService.getData(base_query, {}, track);
			return response;
		}
	},
	async getPosterPath(path: string | undefined, track: boolean): Promise<any> {
		const config: AxiosRequestConfig = {
			headers: {
				['Authorization']: 'Bearer ' + import.meta.env.VITE_TMDB_API_KEY
			}
		};
		if (track) {
			const promise = new Promise((resolve, reject) => {
				trackPromise(axios.get(`https://image.tmdb.org/t/p/w500${path}`, config))
					.then((response) => {
						resolve(response?.data || response);
					})
					.catch((error) => {
						reject(error);
					});
			});
			return promise;
		} else {
			const response = await axios.get(`https://image.tmdb.org/t/p/w500${path}`, config);
			return response?.data || response;
		}
	},
	async mostPopularMovies(page = '1', track: boolean): Promise<any> {
		const base_query = `3/movie/popular?language=en-US&page=${page}`;
		const response = await BaseService.getData(base_query, {}, track);
		return response;
	}
};
