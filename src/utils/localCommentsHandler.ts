import { Comment } from '../interfaces/movieDBResponse.interface';

export function LocalCommentCheck(movieId: number): boolean {
	const localComments = localStorage.getItem(`[comments-${movieId}]`);
	if (localComments) {
		return true;
	} else {
		return false;
	}
}

export function LocalCommentAdd(comments: Comment): void {
	const localComments = localStorage.getItem(`[comments-${comments.movieId}]`);
	if (localComments) {
		const parsedComments = JSON.parse(localComments);
		const newComments = [comments, ...parsedComments];
		localStorage.setItem(`[comments-${comments.movieId}]`, JSON.stringify(newComments));
	} else {
		localStorage.setItem(`[comments-${comments.movieId}]`, JSON.stringify([comments]));
	}
}

export function LocalCommentGet(movieId: number): Comment[] {
	const localComments = localStorage.getItem(`[comments-${movieId}]`);
	if (localComments) {
		return JSON.parse(localComments);
	} else {
		return [];
	}
}
