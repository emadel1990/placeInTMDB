import { useEffect, useState } from 'react';
import { SkeletonMovie } from './SkeletonMovie';
import { useFetch } from '../../hooks/useFetch';
import { SWRFetchConstants, SWRKeyConstants } from '../../config/SWRConstants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMovieData, setMovieList } from '../../redux/slice/movieSlice';
import { Movie } from './Movie';
import { Movie as MovieInterface } from '../../interfaces/movieDBResponse.interface';

export const MovieList = () => {
	const dispatch = useAppDispatch();
	const movieState = useAppSelector(getMovieData);
	const [page, setPage] = useState(1);
	const {
		data: allMovies,
		isLoading,
		mutate: reloadMovies,
		error
	} = useFetch(
		() => SWRKeyConstants.GET_ALL_MOVIES('avengers', page),
		() => SWRFetchConstants.GET_ALL_MOVIES('avengers', page),
		false,
		true
	);

	useEffect(() => {
		if (allMovies) dispatch(setMovieList(allMovies));
	}, [allMovies]);

	useEffect(() => {
		reloadMovies();
	}, [page]);

	return (
		<div className="flex flex-wrap flex-row m-10  max-w-6xl gap-x-10 justify-center ">
			<h1 className="text-3xl font-bold text-white">{`Page:${allMovies?.page}`}</h1>
			{isLoading && (
				<>
					<SkeletonMovie />
					<SkeletonMovie />
					<SkeletonMovie />
					<SkeletonMovie />
					<SkeletonMovie />
				</>
			)}
			{!isLoading &&
				!error &&
				movieState &&
				movieState.moviesData.results.map((movie: MovieInterface) => {
					return (
						<Movie
							key={movie.id}
							id={String(movie.id)}
							imagePath={movie.poster_path!}
							title={movie.title}
						/>
					);
				})}
		</div>
	);
};
