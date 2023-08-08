import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Movie, MovieDBresponse } from '../../interfaces/movieDBResponse.interface';
import type { RootState } from '../store/store';

interface MovieDataState {
	moviesData: MovieDBresponse;
	query: string | undefined;
	favorites?: Movie[];
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
	favorites: [],
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
			state.moviesData.results = state.moviesData.results.map((movie) => {
				if (movie.id === action.payload.id) {
					return action.payload;
				} else {
					return movie;
				}
			});
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
		},
		setMovieSelected: (state, action: PayloadAction<Movie>) => {
			state.movieSelected = action.payload;
		},
		addComment: (state, action: PayloadAction<Comment>) => {
			const movie = state.moviesData.results.find((movie) => movie.id === action.payload.movieId);
			if (movie) {
				movie.comments = movie.comments ? [...movie.comments, action.payload] : [action.payload];
			}
			if (state.movieSelected?.id === action.payload.movieId) {
				state.movieSelected.comments = state.movieSelected.comments ? [...state.movieSelected.comments, action.payload] : [action.payload];
			}
		}
	}
});

export const { setQuery, setMovieList, addMovies, addMovie, updateMovie, removeMovie, resetMovieState, setMovieSelected, addComment } =
	movieSlice.actions;

export const getMovieData = (state: RootState) => state.movie;

export default movieSlice.reducer;
