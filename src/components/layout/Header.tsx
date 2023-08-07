import { memo } from 'react';
import Lottie from 'lottie-react';
import animation_movie from '../../assets/animation_movie.json';

const Header = memo(() => {
	return (
		<div className="flex flex-col justify-start items-center  h-48 mt-10">
			<h1 className="text-2xl text-gray-900 dark:text-white">Welcome to PlaceIn</h1>
			<Lottie
				animationData={animation_movie}
				loop={false}
				style={{ width: 400, height: 100 }}
			/>
			<h1 className="text-2xl text-gray-900 dark:text-white">from TMDB api</h1>
		</div>
	);
});

Header.displayName = 'Header';

export { Header };
