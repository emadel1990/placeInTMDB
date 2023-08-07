import { useState } from 'react';

export interface MovieProps {
	id: string;
	title: string;
	imagePath: string | undefined;
}

export const Movie = ({ id, title, imagePath }: MovieProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleLoadingFinish = () => {
		setIsLoading(false);
	};

	if (error) return null;

	return (
		<div className="h-80 w-48 relative ">
			<div key={id}>
				<img
					src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ''}
					alt={title}
					onLoad={handleLoadingFinish}
					onError={() => setError(true)}
					style={{ display: isLoading ? 'none' : '', objectFit: 'fill' }}
					className="h-60 w-44 hover:scale-105 ease-in-out duration-300 rounded-lg shadow-xl b cursor-pointer"
				/>
			</div>
			{isLoading && <div className="h-60 w-44 bg-gray-300 animate-pulse absolute rounded-lg shadow-xl b cursor-pointer"></div>}
			{!isLoading && <p className="font-mono py-1.5">{title}</p>}
		</div>
	);
};
