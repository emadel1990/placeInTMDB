import React from 'react';

interface MovieFormProps {
	// eslint-disable-next-line no-unused-vars
	formSubmited: (e: React.FormEvent<HTMLFormElement> | any) => void;
	form_ref: React.RefObject<HTMLFormElement>;
}

export const MovieForm = ({ formSubmited, form_ref }: MovieFormProps) => {
	return (
		<form
			className="bg-slate-600 rounded-lg  w-full flex flex-col   "
			onSubmit={formSubmited}
			ref={form_ref}>
			<div className="w-full flex flex-row justify-between gap-x-4">
				<div className="mb-4 w-96">
					<label
						htmlFor="message"
						className="block mb-2 text-md font-medium text-white">
						Your comment
					</label>
					<textarea
						id="message"
						rows={4}
						required
						className="block resize-none p-2.5 w-full text-md text-black bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
						placeholder="Write your comment here..."></textarea>
				</div>
				<div className="mb-6 w-72">
					<label
						htmlFor="email"
						className="block mb-2 text-md font-medium text-white dark:text-white">
						Your email
					</label>
					<input
						type="email"
						id="email"
						className="bg-gray-300 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="name@gmail.com"
					/>
					<label
						htmlFor="name"
						className="block mb-2 mt-4 text-md font-medium text-white dark:text-white">
						Your name
					</label>
					<input
						type="text"
						id="name"
						className="bg-gray-300 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						placeholder="Your name..."
					/>
				</div>
			</div>
			<div className="w-full flex justify-end px-3 ">
				<button
					type="submit"
					className="text-gray-800 font-bold bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center ">
					Submit
				</button>
			</div>
		</form>
	);
};
