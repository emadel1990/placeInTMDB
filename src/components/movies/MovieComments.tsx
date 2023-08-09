import { useState, useEffect } from 'react';
import { StarRating } from '../generics/StarRating';
import { Comment } from '../../interfaces/movieDBResponse.interface';
import { CommentsFilterPush, CommentsFilterUnshift } from '../../helpers/commentsFilter';

interface MovieCommentsProps {
	comments: Comment[] | undefined;
	type: string;
}

export const MovieComments = ({ comments, type }: MovieCommentsProps) => {
	const [newComments, setNewComments] = useState<Comment[]>([]);

	useEffect(() => {
		if (comments) {
			handleComments();
		}
	}, [comments]);

	const handleComments = () => {
		if (!comments) return null;
		const tempComments: Comment[] = CommentsFilterPush(comments, type);
		const tempLocalComments: Comment[] = CommentsFilterUnshift(comments, type);

		const uniqueId: number[] = [];
		const allComments = [...tempLocalComments.reverse(), ...tempComments];
		const unique = handleUniqueId(uniqueId, allComments);
		setNewComments(Array.from(unique));
	};

	const handleUniqueId = (uniqueId: number[], allComments: Comment[]): Comment[] => {
		return allComments.filter((element) => {
			const isDuplicate = uniqueId.includes(element.commentId);

			if (!isDuplicate) {
				uniqueId.push(element.commentId);

				return true;
			}

			return false;
		});
	};

	return (
		<>
			{newComments.map((comment) => (
				<div
					key={comment.commentId}
					className="flex flex-col gap-y-2 mb-4 w-[40rem]">
					<span className="text-gray-100 font-bold">{comment.name}</span>
					<span className="text-gray-100 text-sm">{comment.date}</span>
					<StarRating defaultValue={comment.rating} />
					<label
						className="bg-gray-900 text-gray-100 rounded-lg p-2.5 w-full bg-opacity-30"
						style={{ wordWrap: 'break-word' }}>
						{comment.comment}
					</label>
				</div>
			))}
		</>
	);
};
