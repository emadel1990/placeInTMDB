import { Comment } from '../interfaces/movieDBResponse.interface';
import { LocalCommentCheck, LocalCommentGet } from '../utils/localCommentsHandler';

export function CommentsFilterUnshift(comments: Comment[], type: string): Comment[] {
	const filteredComments: Comment[] = [];
	if (LocalCommentCheck(comments[0].movieId)) {
		const localComments = LocalCommentGet(comments[0].movieId);
		localComments?.forEach((comment) => {
			const dateNow = new Date();
			const dateComment = new Date(comment.date);
			if (type === 'rated' && comment.rating < 4) return null;
			if (type === 'recent' && dateNow.getFullYear() - dateComment.getFullYear() > 2) return null;
			if (type === 'oldest' && dateNow.getFullYear() - dateComment.getFullYear() < 1) return null;
			filteredComments.unshift(comment);
		});
	}
	return filteredComments;
}

export function CommentsFilterPush(comments: Comment[], type: string): Comment[] {
	const filteredComments: Comment[] = [];
	comments?.forEach((comment) => {
		const dateNow = new Date();
		const dateComment = new Date(comment.date);
		if (type === 'rated' && comment.rating < 4) return null;
		if (type === 'recent' && dateNow.getFullYear() - dateComment.getFullYear() > 2) return null;
		if (type === 'oldest' && dateNow.getFullYear() - dateComment.getFullYear() < 1) return null;
		filteredComments.push(comment);
	});
	return filteredComments;
}
