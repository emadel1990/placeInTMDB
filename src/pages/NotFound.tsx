import Lottie from 'lottie-react';
import animation_404 from '../assets/animation_404.json';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../config/routes';

export const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="bg-gradient-to-t from-gray-500 to-gray-700 h-screen flex flex-col items-center justify-start">
			<Lottie
				animationData={animation_404}
				loop={true}
				style={{ width: 800, height: 580 }}
			/>
			<button
				onClick={() => navigate(AppRoutesConstants.HOME)}
				type="button"
				className="py-2.5 px-5 mr-2 mb-2 w-56 text-2xl font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
				Go home
			</button>
		</div>
	);
};
