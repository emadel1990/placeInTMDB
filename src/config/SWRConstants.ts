import { tmdbService } from '../services/tmdb';

export const SWRFetchConstants = {
	GET_ALL_MOVIES: (query: string | undefined, page: number, track = true) => tmdbService.searchMovies(query, String(page), track),
	GET_POPULAR_MOVIES: (page: number, track = true) => tmdbService.mostPopularMovies(String(page), track)
};

export const SWRKeyConstants = {
	GET_ALL_MOVIES: (query: string | undefined, page = 1) => (query ? `getAllMovies/${query}/${String(page)}` : undefined),
	GET_POPULAR_MOVIES: (page = 1) => `getPopularMovies/${String(page)}`
};
