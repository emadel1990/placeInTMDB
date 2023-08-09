import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Movie, MovieDBresponse } from '../../interfaces/movieDBResponse.interface';
import type { RootState } from '../store/store';

interface MovieDataState {
	moviesData: MovieDBresponse;
	query: string | undefined;
	myList?: Movie[];
	movieSelected?: Movie | undefined;
}

const initialState: MovieDataState = {
	moviesData: {
		page: 0,
		results: [],
		total_pages: 0,
		total_results: 0
	},
	query: undefined,
	myList: [],
	movieSelected: undefined
};

export const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
		setMovieList: (state, action: PayloadAction<MovieDBresponse>) => {
			state.moviesData = action.payload;
		},
		addMovies: (state, action: PayloadAction<Movie[]>) => {
			state.moviesData.results.push(...action.payload);
		},
		addMovie: (state, action: PayloadAction<Movie>) => {
			state.moviesData.results.push(action.payload);
		},
		updateMovie: (state, action: PayloadAction<Movie>) => {
			const movie = state.moviesData.results.filter((movie) => movie.id === action.payload.id);
			if (movie) {
				movie[0] = action.payload;
			}
			if (movie[0].id === state.movieSelected?.id) {
				state.movieSelected = action.payload;
			}
		},
		removeMovie: (state, action: PayloadAction<number>) => {
			state.moviesData.results = state.moviesData.results.filter((movie) => movie.id !== action.payload);
		},
		resetMovieState: (state) => {
			state.moviesData = initialState.moviesData;
			state.query = initialState.query;
			state.myList = initialState.myList;
		},
		addToMyList: (state, action: PayloadAction<Movie>) => {
			state.myList?.push(action.payload);
		},
		removeFromMyList: (state, action: PayloadAction<number>) => {
			state.myList = state.myList?.filter((movie) => movie.id !== action.payload);
		},
		resetMyList: (state) => {
			state.myList = initialState.myList;
		},
		setMovieSelected: (state, action: PayloadAction<Movie>) => {
			state.movieSelected = action.payload;
		},
		addComment: (state, action: PayloadAction<Comment>) => {
			const movie = state.moviesData.results.find((movie) => movie.id === action.payload.movieId);
			if (movie) {
				movie.comments = movie.comments ? [action.payload, ...movie.comments] : [action.payload];
			}
			if (state.movieSelected?.id === action.payload.movieId) {
				state.movieSelected.comments = state.movieSelected.comments ? [action.payload, ...state.movieSelected.comments] : [action.payload];
			}
		},
		addComments: (state, action: PayloadAction<Comment[]>) => {
			const movie = state.moviesData.results.find((movie) => movie.id === action.payload[0].movieId);
			if (movie) {
				movie.comments = movie.comments ? [...action.payload, ...movie.comments] : [...action.payload];
			}
			if (state.movieSelected?.id === action.payload[0].movieId) {
				state.movieSelected.comments = state.movieSelected.comments
					? [...action.payload, ...state.movieSelected.comments]
					: [...action.payload];
			}
		}
	}
});

export const {
	setQuery,
	setMovieList,
	addMovies,
	addMovie,
	updateMovie,
	removeMovie,
	resetMovieState,
	setMovieSelected,
	addComment,
	addToMyList,
	removeFromMyList,
	resetMyList
} = movieSlice.actions;

export const getMovieData = (state: RootState) => state.movie;

export default movieSlice.reducer;
