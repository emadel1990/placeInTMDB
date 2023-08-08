import { memo, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animation_movie from '../../assets/animation_movie.json';
import { useAppSelector } from '../../hooks';
import { getMovieData } from '../../redux/slice/movieSlice';

const Hero = memo(() => {
	const [refresh, setRefresh] = useState(false);
	const movieState = useAppSelector(getMovieData);

	useEffect(() => {
		setRefresh(true);
		setRefresh(false);
	}, [movieState.query]);

	return (
		<div className="flex flex-col justify-start items-center  min-h-48 mt-10 text-center mb-4">
			<h1 className="text-3xl text-white dark:text-white font-sans">Welcome to PlaceIn</h1>
			<Lottie
				animationData={animation_movie}
				loop={refresh}
				style={{ width: 400, height: 100 }}
			/>
			<h1 className="text-2xl text-white dark:text-white">from TMDB api</h1>
		</div>
	);
});

Hero.displayName = 'Hero';

export { Hero };
