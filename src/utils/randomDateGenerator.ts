export default function getRandomDateAsString(): string {
	const startOfYear = new Date(2000, 0, 1).getTime();
	const endOfYear = new Date(2023, 11, 31).getTime();
	const randomTimestamp = startOfYear + Math.random() * (endOfYear - startOfYear);
	const randomDate = new Date(randomTimestamp);

	const year = randomDate.getFullYear();
	const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
	const day = randomDate.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
}
