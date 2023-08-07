import { BaseService } from '../baseService';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

export const tmdbService = {
	async searchMovies(query: string | undefined, page: string | undefined, track: boolean): Promise<any> {
		if (!query) return null;
		if (page) {
			const response = await BaseService.getData(`${query}&page=${page}`, {}, track);
			return response;
		} else {
			const response = await BaseService.getData(query, {}, track);
			return response;
		}
	},
	async getPosterPath(path: string | undefined, track: boolean): Promise<any> {
		if (track) {
			const response = await axios.get(`https://image.tmdb.org/t/p/w500${path}`);
			return response;
		}
		if (track) {
			const promise = new Promise((resolve, reject) => {
				trackPromise(axios.get(`https://image.tmdb.org/t/p/w500${path}`))
					.then((response) => {
						resolve(response?.data || response);
					})
					.catch((error) => {
						reject(error);
					});
			});
			return promise;
		} else {
			const response = await axios.get(`https://image.tmdb.org/t/p/w500${path}`);
			return response?.data || response;
		}
	}
};
