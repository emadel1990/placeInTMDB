import { useState, useEffect } from 'react';
import { Hero } from '../components/layout/Hero';
import { SearchBar } from '../components/movies/SearchBar';
import { MovieList } from '../components/movies/MovieList';
import { useAppSelector } from '../hooks';
import { getMovieData } from '../redux/slice/movieSlice';
import { PopularMovieList } from '../components/movies/PopularMovieList';

export const MoviesHomePage = () => {
	const movieData = useAppSelector(getMovieData);
	const [showPopular, setShowPopular] = useState(true);

	useEffect(() => {
		if (movieData.query && movieData.query?.length > 0) {
			setShowPopular(false);
		} else {
			setShowPopular(true);
		}
	}, [movieData.query]);
	return (
		<div className="app max-w-screen text-white flex justify-start flex-col items-center min-h-screen">
			<div className="w-5/12">
				<Hero />
				<SearchBar />
			</div>
			{showPopular ? <PopularMovieList /> : <MovieList />}
		</div>
	);
};
