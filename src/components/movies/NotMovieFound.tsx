import Lottie from 'lottie-react';
import animation_404 from '../../assets/animation_movieFound.json';

export const NoMovieFound = () => {
	return (
		<div className="flex justify-start items-center flex-col w-full">
			<h1 className="text-3xl font-bold text-white font-mono">No movie found...</h1>
			<Lottie
				animationData={animation_404}
				loop={true}
				color="#d9d9d9"
				style={{ width: 400, marginTop: -65 }}
			/>
		</div>
	);
};
