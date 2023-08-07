import React from 'react';
import './app.css';
import { Header } from './components/layout/Header';
import { SeachBar } from './components/movies/SeachBar';
import { MovieList } from './components/movies/MovieList';

export const App = () => {
	return (
		<div className="app max-w-screen text-white flex justify-start flex-col items-center min-h-screen">
			<div className="w-5/12">
				<Header />
				<SeachBar />
			</div>
			<MovieList />
		</div>
	);
};
