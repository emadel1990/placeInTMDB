import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDBresponse } from '../../interfaces/movieDBResponse.interface';
import type { RootState } from '../store/store';

interface MovieDataState {
	moviesData: MovieDBresponse;
}

const initialState: MovieDataState = {
	moviesData: {
		page: 0,
		results: [],
		total_pages: 0,
		total_results: 0
	}
};

export const movieSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setMovieList: (state, action: PayloadAction<MovieDBresponse>) => {
			state.moviesData = action.payload;
		},
		addMovie: (state, action: PayloadAction<Movie>) => {
			state.moviesData.results.push(action.payload);
		},
		removeMovie: (state, action: PayloadAction<number>) => {
			state.moviesData.results = state.moviesData.results.filter((movie) => movie.id !== action.payload);
		},
		resetMovieState: (state) => {
			state.moviesData = initialState.moviesData;
		}
	}
});

export const { setMovieList, addMovie, removeMovie, resetMovieState } = movieSlice.actions;

export const getMovieData = (state: RootState) => state.movie;

export default movieSlice.reducer;
