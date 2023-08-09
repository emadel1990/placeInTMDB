import React, { useState, useEffect, useRef } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { getMovieData, addComment, updateMovie, addToMyList } from '../redux/slice/movieSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Comment, Movie } from '../interfaces/movieDBResponse.interface';
import { useFetch } from '../hooks/useFetch';
import { SWRFetchConstants, SWRKeyConstants } from '../config/SWRConstants';
import { AppRoutesConstants } from '../config/routes';
import { StarRating } from '../components/generics/StarRating';
import { CircularProgress } from '../components/generics/CircularProgress';
import { MovieForm } from '../components/movies/MovieForm';
import { MovieTabsComments } from '../components/movies/MovieTabsComments';
import { CommentGenerator } from '../utils/FakeComments';
import { LocalCommentAdd } from '../utils/localCommentsHandler';
import { MovieScore } from '../components/movies/MovieScore';

const MoviePage = () => {
	const dispatch = useAppDispatch();
	const form_ref = useRef<HTMLFormElement>(null);
	const navigate = useNavigate();
	const movieState = useAppSelector(getMovieData);
	const [movie, setMovie] = useState<Movie>();
	const [genres, setGenres] = useState<string[]>([]);
	const [rating, setRating] = useState<number>(3);
	const { data: genresFetch, mutate } = useFetch(
		() => SWRKeyConstants.GET_GENRES(),
		() => SWRFetchConstants.GET_GENRES()
	);

	useEffect(() => {
		if (genresFetch && movie) {
			if (movie) {
				addComments();
			}
			const genres: string[] = [];
			for (let i = 0; i < genresFetch?.data?.genres?.length; i++) {
				for (let j = 0; j < movie?.genre_ids.length; j++) {
					if (genresFetch.data.genres[i].id === movie?.genre_ids[j]) {
						genres.push(genresFetch.data.genres[i].name);
					}
				}
			}
			setGenres(genres);
		}
	}, [genresFetch, movie]);

	useEffect(() => {
		if (movieState && movieState.movieSelected) {
			setMovie(movieState.movieSelected);
			mutate();
		} else {
			navigate(AppRoutesConstants.HOME);
		}
	}, [movieState]);

	const formSubmited = (e: React.FormEvent<HTMLFormElement> | any) => {
		e.preventDefault();
		if (!movie) return;
		const newComment: Comment = {
			commentId: Math.floor(Math.random() * 1000000),
			comment: e.currentTarget[0].value,
			email: e.currentTarget[1].value.length > 0 ? e.currentTarget[1].value : 'Anonymous',
			name: e.currentTarget[2].value.length > 0 ? e.currentTarget[2].value : 'Anonymous',
			rating: rating,
			movieId: movie?.id,
			date: new Date().toLocaleDateString().split('/').reverse().join('-')
		};
		dispatch(addComment(newComment));
		LocalCommentAdd(newComment);
		dispatch(addToMyList(movie));
		setRating(3);
		form_ref.current?.reset();
	};

	const addComments = () => {
		if (!movieState.movieSelected) return;
		if (movie?.comments === undefined) {
			const randomComments = CommentGenerator(movieState.movieSelected.id);
			const localMovie: Movie = { ...movieState.movieSelected };
			localMovie.comments = [...randomComments];
			dispatch(updateMovie(localMovie));
		}
	};

	return (
		<div className="min-h-[calc(100vh-72px)] bg-slate-500 overflow-hidden lg:px-64 md:px-40 px-20 py-20 app">
			<button
				onClick={() => navigate(AppRoutesConstants.HOME, { replace: true })}
				type="button"
				className="w-40 mb-10 text-white bg-gradient-to-r from-blue-gray-500 via-blue-gray-600 to-blue-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
				<span className="font-bold">BACK</span>
			</button>
			<div className="flex gap-x-10">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
					alt={'moviePoster'}
					style={{ objectFit: 'fill' }}
					className="h-[450px] rounded-lg shadow-2xl b cursor-pointer"
				/>
				<div className="w-full flex flex-col justify-start items-start gap-y-5">
					<h1 className="text-3xl font-bold text-white">{`${movie?.title} (${String(movie?.release_date).slice(0, 4)})`}</h1>
					<div className="flex gap-x-2">
						<span className="border-2 px-1 text-white opacity-60">{movie?.adult ? '+18' : '+13'}</span>
						<span className="text-white font-bold text-xl -my-[0.5px]">•</span>
						<span className="text-white text-xl font-bold">{String(movie?.release_date)}</span>
						<span className="text-white font-bold text-xl -my-[0.5px]">•</span>
						<span className="border-2 px-1 text-white opacity-60 rounded-lg">{movie?.original_language.toUpperCase()}</span>
					</div>
					<div className="flex gap-x-3">
						{genres.map((genre) => (
							<span
								key={genre}
								className="border-2 border-opacity-25 border-black px-2 text-yellow-400 text-lg font-bold  rounded-lg">
								{genre}
							</span>
						))}
					</div>
					<div className="flex gap-x-5">
						<CircularProgress
							value={movie?.vote_average ? movie?.vote_average * 10 : 0}
							text={`${movie?.vote_average ? movie?.vote_average * 10 : 0}%`}
						/>
						<p className="text-xl font-sans text-white">{movie?.overview}</p>
					</div>
					<MovieScore score={movie?.popularity ? movie?.popularity : 0} />
					<hr className="divide-white w-full" />
					<div className="w-full flex flex-col gap-4  ">
						<h3 className="text-white text-lg">Rate and leave a comment...</h3>
						<StarRating
							rating={rating}
							setRating={setRating}
						/>
						<MovieForm
							formSubmited={formSubmited}
							form_ref={form_ref}
						/>
					</div>
					<hr className="divide-white w-full" />
					<MovieTabsComments movieComments={movieState.movieSelected?.comments} />
				</div>
			</div>
		</div>
	);
};

export default MoviePage;
