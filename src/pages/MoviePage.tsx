import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovieData, addComment } from '../redux/slice/movieSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Comment, Movie } from '../interfaces/movieDBResponse.interface';
import { useFetch } from '../hooks/useFetch';
import { SWRFetchConstants, SWRKeyConstants } from '../config/SWRConstants';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AppRoutesConstants } from '../config/routes';
import { StarRating } from '../components/generics/StarRating';

export const MoviePage = () => {
	const dispatch = useAppDispatch();
	const form_ref = useRef<HTMLFormElement>(null);
	const navigate = useNavigate();
	const movieState = useAppSelector(getMovieData);
	const [movie, setMovie] = useState<Movie>();
	const [genres, setGenres] = useState<string[]>([]); // ['Action', 'Adventure', 'Fantasy', 'Science Fiction']
	const [rating, setRating] = useState<number>(0);
	const { data: genresFetch, mutate } = useFetch(
		() => SWRKeyConstants.GET_GENRES(),
		() => SWRFetchConstants.GET_GENRES()
	);

	useEffect(() => {
		if (genresFetch && movie) {
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

	const handleSetRating = (value: number) => {
		setRating(value);
	};

	const formSubmited = (e: React.FormEvent<HTMLFormElement> | any) => {
		e.preventDefault();
		if (!movie) return;
		const newComment: Comment = {
			comment: e.currentTarget[0].value,
			email: e.currentTarget[1].value,
			name: e.currentTarget[2].value,
			rating: rating,
			movieId: movie?.id
		};
		dispatch(addComment(newComment));
	};

	return (
		<div className="min-h-[calc(100vh-72px)] bg-slate-500 overflow-hidden lg:px-64 md:px-40 px-20 py-20 ">
			<div className="flex gap-x-10">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
					alt={'moviePoster'}
					style={{ objectFit: 'fill' }}
					className="h-[450px] rounded-lg shadow-2xl b cursor-pointer"
				/>
				<div className="flex flex-col justify-start items-start gap-y-5">
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
							<span className="border-2 border-opacity-25 border-yellow-100 px-1 text-orange-400 text-lg font-bold  rounded-lg">
								{genre}
							</span>
						))}
					</div>
					<div className="flex gap-x-5">
						<div className="w-[650px]">
							<CircularProgressbar
								value={movie?.vote_average ? movie?.vote_average * 10 : 0}
								text={`${movie?.vote_average ? movie?.vote_average * 10 : 0}%`}
								styles={buildStyles({
									// Rotation of path and trail, in number of turns (0-1)
									rotation: 0.1,
									// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
									strokeLinecap: 'butt',
									// Text size
									textSize: '20px',
									// How long animation takes to go from one percentage to another, in seconds
									pathTransitionDuration: 1,
									// Can specify path transition in more detail, or remove it entirely
									// pathTransition: 'none',
									// Colors
									pathColor: `#fb923c`,
									textColor: '#fb923c',
									/* trailColor: 'red', */
									backgroundColor: '#3e98c7'
								})}
							/>
							;
						</div>
						<p className="text-xl font-sans text-white">{movie?.overview}</p>
					</div>
					<StarRating setRating={handleSetRating} />

					<form
						className="bg-slate-600 rounded-lg p-5 w-full flex flex-col  "
						onSubmit={formSubmited}
						ref={form_ref}>
						<div className=" w-full flex flex-row justify-around">
							<div className="mb-4 w-96">
								<label
									htmlFor="message"
									className="block mb-2 text-sm font-medium text-white dark:text-white">
									Your comment
								</label>
								<textarea
									id="message"
									rows={4}
									required
									className="block resize-none p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Write your comment here..."></textarea>
							</div>
							<div className="mb-6 w-72">
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-white dark:text-white">
									Your email
								</label>
								<input
									type="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@gmail.com"
									required
								/>
								<label
									htmlFor="name"
									className="block mb-2 mt-4 text-sm font-medium text-white dark:text-white">
									Your name
								</label>
								<input
									type="text"
									id="name"
									className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Your name..."
									required
								/>
							</div>
						</div>
						<div className="w-full flex justify-end px-3 ">
							<button
								type="submit"
								className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
