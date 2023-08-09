import { OriginalLanguage } from '../enums/originalLanguage.enum';

export interface MovieDBresponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface Movie {
	adult: boolean;
	backdrop_path: null | string;
	genre_ids: number[];
	id: number;
	original_language: OriginalLanguage;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: null | string;
	release_date: Date;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	comments?: Comment[];
}

export interface Comment {
	commentId: number;
	movieId: number;
	comment: string;
	name: string;
	email: string;
	rating: number;
	date: string;
}
