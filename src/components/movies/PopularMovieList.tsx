import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { SWRFetchConstants, SWRKeyConstants } from '../../config/SWRConstants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addMovies, getMovieData, setMovieList } from '../../redux/slice/movieSlice';
import { Movie } from './Movie';
import { Movie as MovieInterface } from '../../interfaces/movieDBResponse.interface';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoMovieFound } from './NotMovieFound';

export const PopularMovieList = () => {
	const dispatch = useAppDispatch();
	const movieState = useAppSelector(getMovieData);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const {
		data: allMovies,
		mutate: reloadMovies,
		error
	} = useFetch(
		() => SWRKeyConstants.GET_POPULAR_MOVIES(page),
		() => SWRFetchConstants.GET_POPULAR_MOVIES(page)
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

	return (
		<div className="flex flex-wrap flex-row m-10  max-w-6xl gap-x-10 justify-center ">
			{error && <h1 className="text-3xl font-bold text-white">Error while fetching...</h1>}
			{movieState.moviesData.results.length > 0 && (
				<InfiniteScroll
					className="flex flex-wrap flex-row mx-10 w-full gap-x-8 justify-cente p-5"
					dataLength={movieState?.moviesData?.results?.length}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={<h1 className="text-3xl font-bold text-white">Loading...</h1>}
					height={500}>
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
			)}
			{(movieState.moviesData.results.length === 0 || error) && <NoMovieFound />}
		</div>
	);
};
