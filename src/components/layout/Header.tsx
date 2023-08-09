import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutesConstants } from '../../config/routes';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-gray-800 p-4 sticky top-0 z-10">
			<div className="container mx-auto flex justify-between items-center lg:px-40">
				<div className="flex items-center">
					<Link to={AppRoutesConstants.HOME}>
						<img
							className="h-10 w-auto mr-4 bg-white px-4 py-2 rounded-sm"
							src="https://placein.com/wp-content/uploads/2023/04/Logo_completo-172x45.png"
							alt="Logo"
						/>
					</Link>
					<label className="text-white font-sans font-bold text-lg">MovieDB Challenge</label>
				</div>
				<div className="hidden md:flex items-center">
					<Link
						to={AppRoutesConstants.HOME}
						className="text-white mx-4 font-bold text-lg font-body">
						Home
					</Link>
					<Link
						to={AppRoutesConstants.MY_LIST}
						className="text-white mx-4 font-bold text-lg font-body">
						My List
					</Link>
				</div>
				<div className="md:hidden flex items-center">
					<button
						onClick={toggleMenu}
						className="text-white focus:outline-none"
						aria-label="Menu">
						<svg
							className="h-6 w-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							{isOpen ? (
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M19 12L12 5L5 12L12 19L19 12ZM16.88 13.69L13.69 16.88L12 15.19L10.31 16.88L7.12 13.69L8.81 12L5.62 8.81L8.81 5.62L10.31 7.12L13.5 3.93L12 2.43L7.5 6.93L6.56 5.99L11.06 1.5L12 0.56L12.94 1.5L17.44 5.99L16.5 6.93L12 2.43L10.5 3.93L14.69 7.12L16.38 8.81L13.19 12L16.38 15.19L14.69 16.88L10.5 12.69L12 11.19L16.88 16.06L18.37 14.56L16.88 13.69Z"
								/>
							) : (
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6V18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18V6ZM7 5C6.44772 5 6 5.44772 6 6V18C6 18.5523 6.44772 19 7 19C7.55228 19 8 18.5523 8 18V6C8 5.44772 7.55228 5 7 5ZM21 6C21 5.44772 20.5523 5 20 5C19.4477 5 19 5.44772 19 6V18C19 18.5523 19.4477 19 20 19C20.5523 19 21 18.5523 21 18V6Z"
								/>
							)}
						</svg>
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden absolute">
					<div className="flex flex-col mt-2">
						<Link
							to="/"
							className="block text-white px-4 py-2 rounded hover:bg-gray-700">
							Home
						</Link>
						<Link
							to="/about"
							className="block text-white px-4 py-2 rounded hover:bg-gray-700">
							About
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};
