import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { getMovieData } from '../redux/slice/movieSlice';
import { AppRoutesConstants } from '../config/routes';
import { Movie } from '../components/movies/Movie';

const MyList = () => {
	const navigate = useNavigate();
	const movieState = useAppSelector(getMovieData);

	return (
		<div className="min-h-[calc(100vh-72px)] bg-slate-500 overflow-hidden lg:px-64 md:px-40 px-20 py-20 app">
			<h1 className="text-4xl font-bold text-white text-center text-2xl">My List</h1>
			<button
				onClick={() => navigate(AppRoutesConstants.HOME, { replace: true })}
				type="button"
				className="w-40 mb-10 text-white bg-gradient-to-r from-blue-gray-500 via-blue-gray-600 to-blue-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
				<span className="font-bold">BACK</span>
			</button>
			{movieState?.myList && movieState?.myList?.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4 mt-10">
					{movieState.myList.map((movie, index) => {
						return (
							<Movie
								key={movie.id + index}
								id={String(movie.id)}
								title={movie.title}
								imagePath={movie.poster_path!}
								movie={movie}
								isDeleted={true}
							/>
						);
					})}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center mt-10">
					<h1 className="text-2xl font-bold text-white">You don't have any movie in your list</h1>
					<button
						onClick={() => navigate(AppRoutesConstants.HOME, { replace: true })}
						type="button"
						className="w-40 mt-10 text-white bg-gradient-to-r from-blue-gray-500 via-blue-gray-600 to-blue-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
						<span className="font-bold">BACK</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default MyList;
