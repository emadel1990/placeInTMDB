import { useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export const Spinner = () => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<>
			<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden -mt-24 -ml-2 flex flex-col items-center justify-center">
				<RotatingLines
					strokeColor="black"
					strokeWidth="5"
					animationDuration="1"
					width="106"
					visible={true}
				/>
			</div>
			<div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-40 overflow-hidden bg-blue-gray-800 opacity-90 flex flex-col items-center justify-center">
				<h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
			</div>
		</>
	);
};
