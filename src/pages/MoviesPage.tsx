import React from 'react';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/movies/SearchBar';
import { MovieList } from '../components/movies/MovieList';

export const MoviesPage = () => {
	return (
		<div className="app max-w-screen text-white flex justify-start flex-col items-center min-h-screen">
			<div className="w-5/12">
				<Header />
				<SearchBar />
			</div>
			<MovieList />
		</div>
	);
};
