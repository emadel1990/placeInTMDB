import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../config/routes';
import { useAppDispatch } from '../../hooks';
import { removeFromMyList, setMovieSelected } from '../../redux/slice/movieSlice';
import { Movie as MovieInterface } from '../../interfaces/movieDBResponse.interface';
export interface MovieProps {
	id: string;
	title: string;
	imagePath: string | undefined;
	movie: MovieInterface;
	isDeleted?: boolean;
}

export const Movie = ({ id, title, imagePath, movie, isDeleted }: MovieProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleLoadingFinish = () => {
		setIsLoading(false);
	};

	const handleClickMovie = () => {
		dispatch(setMovieSelected(movie));
		navigate(`${AppRoutesConstants.MOVIE}`);
	};

	const handleDeleteMovie = () => {
		dispatch(removeFromMyList(movie.id));
	};
	if (error) return null;

	return (
		<div className="h-80 w-48 relative mb-6 relative">
			{isDeleted && (
				<button
					onClick={handleDeleteMovie}
					className="z-50 absolute bg-red-800 rounded-full w-[35px] h-[35px] fixed -top-3 right-0 font-bold">
					X
				</button>
			)}
			<div key={id}>
				<img
					onClick={handleClickMovie}
					src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ''}
					alt={title}
					onLoad={handleLoadingFinish}
					onError={() => setError(true)}
					style={{ display: isLoading ? 'none' : '', objectFit: 'fill' }}
					className={`h-60 w-44 ${
						!isDeleted ? 'hover:scale-105' : 'hover:scale-100'
					} ease-in-out duration-300 rounded-lg shadow-xl b cursor-pointer`}
				/>
			</div>
			{isLoading && <div className="h-60 w-44 bg-gray-300 animate-pulse absolute rounded-lg shadow-xl b cursor-pointer"></div>}
			{!isLoading && <p className="font-mono py-1.5 text-white">{title}</p>}
			{!isLoading && <p className="font-mono text-sm text-white">{String(movie.release_date)}</p>}
		</div>
	);
};
