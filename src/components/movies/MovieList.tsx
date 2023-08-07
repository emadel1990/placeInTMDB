import { useEffect, useState } from 'react';
import { SkeletonMovie } from './SkeletonMovie';
import { useFetch } from '../../hooks/useFetch';
import { SWRFetchConstants, SWRKeyConstants } from '../../config/SWRConstants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addMovies, getMovieData, setMovieList } from '../../redux/slice/movieSlice';
import { Movie } from './Movie';
import { Movie as MovieInterface } from '../../interfaces/movieDBResponse.interface';
import InfiniteScroll from 'react-infinite-scroll-component';

export const MovieList = () => {
	const dispatch = useAppDispatch();
	const movieState = useAppSelector(getMovieData);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const {
		data: allMovies,
		isLoading,
		mutate: reloadMovies,
		error
	} = useFetch(
		() => SWRKeyConstants.GET_ALL_MOVIES(movieState.query, page),
		() => SWRFetchConstants.GET_ALL_MOVIES(movieState.query, page)
	);

	useEffect(() => {
		if (allMovies && allMovies.page === 1) dispatch(setMovieList(allMovies));
		checkhasMore();
	}, [allMovies]);

	useEffect(() => {
		reloadMovies();
		if (allMovies?.page && allMovies?.total_pages) {
			dispatch(addMovies(allMovies.results));
		}
	}, [page, allMovies]);

	const checkhasMore = () => {
		if (allMovies?.page && allMovies?.total_pages) {
			if (allMovies?.page < allMovies?.total_pages) {
				setHasMore(true);
			} else {
				setHasMore(false);
			}
		}
	};

	const fetchMoreData = () => {
		if (hasMore) {
			setPage(page + 1);
		}
	};

	if (error) {
		console.log(error);
	}

	return (
		<div className="flex flex-wrap flex-row m-10  max-w-6xl gap-x-10 justify-center ">
			{error && <h1 className="text-3xl font-bold text-white">Error while fetching...</h1>}
			{isLoading && (
				<>
					<SkeletonMovie />
					<SkeletonMovie />
					<SkeletonMovie />
					<SkeletonMovie />
					<SkeletonMovie />
				</>
			)}
			<InfiniteScroll
				className="flex flex-wrap flex-row m-10  w-full gap-x-10 justify-center"
				dataLength={movieState?.moviesData?.results?.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={
					<>
						<SkeletonMovie />
						<SkeletonMovie />
						<SkeletonMovie />
						<SkeletonMovie />
						<SkeletonMovie />
					</>
				}
				/* height={400} */
				/* endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				} */
			>
				{movieState.moviesData.results.map((movie: MovieInterface, index: number) => {
					return (
						<Movie
							key={index}
							id={String(movie.id)}
							imagePath={movie.poster_path!}
							title={movie.title}
						/>
					);
				})}
			</InfiniteScroll>
		</div>
	);
};
