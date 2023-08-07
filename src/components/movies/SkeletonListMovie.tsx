import React from 'react';
import { SkeletonMovie } from './SkeletonMovie';

export const SkeletonListMovie = () => {
	return (
		<>
			<SkeletonMovie />
			<SkeletonMovie />
			<SkeletonMovie />
			<SkeletonMovie />
			<SkeletonMovie />
		</>
	);
};
