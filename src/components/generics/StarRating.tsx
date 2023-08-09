/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';

interface StarRatingProps {
	setRating?: Dispatch<SetStateAction<number>>;
	rating?: number;
	defaultValue?: number;
}

function getRating(rating: number) {
	switch (rating) {
		case 1:
			return 'Poor';
		case 2:
			return 'Nothing special';
		case 3:
			return 'Average';
		case 4:
			return 'Very good';
		case 5:
			return 'Excellent';
		default:
			return 'None';
	}
}

export const StarRating = ({ rating, setRating, defaultValue }: StarRatingProps) => {
	const [localRating, setLocalRating] = useState<number>(0);
	const [hoveredRating, setHoveredRating] = useState(rating);

	useEffect(() => {
		if (rating) {
			setLocalRating(rating);
		}
	}, [rating]);

	const handleChange = (value: number) => {
		setLocalRating(value);
		if (setRating) {
			setRating(value);
		}
	};

	if (!rating && !defaultValue) return null;

	return (
		<div style={{ maxWidth: 180, width: '100%' }}>
			<Rating
				value={defaultValue || localRating}
				onChange={handleChange}
				onHoverChange={setHoveredRating}
				readOnly={!!defaultValue}
			/>
			{!defaultValue && (
				<div className="flex flex-col">
					<span className="text-white font-bold font-bold pt-1">{`${getRating(rating!)}`}</span>
				</div>
			)}
		</div>
	);
};
