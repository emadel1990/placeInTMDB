import { useState } from 'react';
import ReactStars from 'react-rating-star-with-type';

interface StarRatingProps {
	// eslint-disable-next-line no-unused-vars
	setRating: (value: any) => void;
}

export const StarRating = ({ setRating }: StarRatingProps) => {
	const [star, setStar] = useState(3);

	const onChange = (nextValue: any) => {
		setStar(nextValue);
		setRating(nextValue);
	};

	return (
		<ReactStars
			onChange={onChange}
			count={5}
			value={star}
			isEdit={true}
			size={30}
			activeColors={['#FFCE00']}
		/>
	);
};
