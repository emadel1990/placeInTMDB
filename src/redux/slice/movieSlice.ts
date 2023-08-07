import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDBresponse } from '../../interfaces/movieDBResponse.interface';
import type { RootState } from '../store/store';

interface MovieDataState {
	moviesData: MovieDBresponse;
	query: string | undefined;
	favorites?: Movie[];
}

const initialState: MovieDataState = {
	moviesData: {
		page: 0,
		results: [],
		total_pages: 0,
		total_results: 0
	},
	query: undefined,
	favorites: []
};

export const movieSlice = createSlice({
	name: 'user',
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
		removeMovie: (state, action: PayloadAction<number>) => {
			state.moviesData.results = state.moviesData.results.filter((movie) => movie.id !== action.payload);
		},
		resetMovieState: (state) => {
			state.moviesData = initialState.moviesData;
			state.query = initialState.query;
			state.favorites = initialState.favorites;
		},
		addToFavorites: (state, action: PayloadAction<Movie>) => {
			state.favorites?.push(action.payload);
		},
		removeFromFavorites: (state, action: PayloadAction<number>) => {
			state.favorites = state.favorites?.filter((movie) => movie.id !== action.payload);
		},
		resetFavorites: (state) => {
			state.favorites = initialState.favorites;
		}
	}
});

export const { setQuery, setMovieList, addMovies, addMovie, removeMovie, resetMovieState } = movieSlice.actions;

export const getMovieData = (state: RootState) => state.movie;

export default movieSlice.reducer;
