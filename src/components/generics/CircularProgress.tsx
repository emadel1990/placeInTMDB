import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface CircularProgressProps {
	value: number;
	text: string;
}

export const CircularProgress = ({ value, text }: CircularProgressProps) => {
	return (
		<div className="min-w-[130px] min-h-[180px]">
			<CircularProgressbar
				value={value}
				text={text}
				styles={buildStyles({
					// Rotation of path and trail, in number of turns (0-1)
					rotation: 0.1,
					// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
					strokeLinecap: 'butt',
					// Text size
					textSize: '20px',
					// How long animation takes to go from one percentage to another, in seconds
					pathTransitionDuration: 1,
					// Can specify path transition in more detail, or remove it entirely
					// pathTransition: 'none',
					// Colors
					pathColor: `#fb923c`,
					textColor: '#fb923c',
					/* trailColor: 'red', */
					backgroundColor: '#3e98c7'
				})}
			/>
		</div>
	);
};
