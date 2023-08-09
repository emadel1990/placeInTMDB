import { Comment } from '../interfaces/movieDBResponse.interface';
import getRandomDateAsString from './randomDateGenerator';

export function CommentGenerator(movieId: number): Comment[] {
	const comments: Comment[] = [];

	const names = ['John', 'Alice', 'Michael', 'Emily', 'David'];
	const emails = ['john@example.com', 'alice@example.com', 'michael@example.com', 'emily@example.com', 'david@example.com'];

	const generateRandomComment = (): string => {
		const wordCount = Math.floor(Math.random() * 10) + 10;
		const words = [
			'This',
			'movie',
			'is',
			'so',
			'amazing',
			'I',
			"can't",
			'believe',
			'how',
			'incredible',
			'the',
			'plot',
			'twists',
			'are',
			'and',
			'the',
			'acting',
			'is',
			'top-notch',
			'!',
			'Highly',
			'recommended',
			'to',
			'everyone',
			'who',
			'loves',
			'good',
			'cinema',
			'.'
		];

		const commentWords = [];
		for (let i = 0; i < wordCount; i++) {
			const randomWordIndex = Math.floor(Math.random() * words.length);
			commentWords.push(words[randomWordIndex]);
		}

		return commentWords.join(' ');
	};

	for (let i = 1; i <= 20; i++) {
		//const movieIndex = Math.floor(Math.random() * movies.length);
		const nameIndex = Math.floor(Math.random() * names.length);
		const emailIndex = Math.floor(Math.random() * emails.length);
		const rating = Math.floor(Math.random() * 5) + 1;

		comments.push({
			movieId: movieId,
			comment: generateRandomComment(),
			name: names[nameIndex],
			email: emails[emailIndex],
			rating: rating,
			date: getRandomDateAsString(),
			commentId: Math.floor(Math.random() * 1000000)
		});
	}

	return comments;
}
