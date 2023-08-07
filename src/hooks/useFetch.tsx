import useSwr from 'swr';
/**
 *
 * @param path The path for the fetcher to use. Can be a string or a function that returns a string.
 * @param fetcher The fetcher function to use. Can be a function that returns a promise or a promise.
 * @param reloadOnFocus Specify if the fetcher should be revalidated on focus.
 * @param revalidateOnMount Specify if the fetcher should be revalidated on mount.
 * @param revalidateIfStale Specify if the fetcher should be revalidated if stale.
 * @param reloadOnReconnect Specify if the fetcher should be revalidated on reconnect.
 * @param RevalidateInterval Specify the interval in MINUTES for the fetcher to be revalidated (default is 3 minutes)
 * @returns
 */
export const useFetch = (
	path: () => string | string | null | undefined,
	fetcher: () => Promise<any>,
	reloadOnFocus = false,
	revalidateOnMount = false,
	reloadIfStale = false,
	reloadOnReconnect = false,
	RevalidateInterval?: number
) => {
	if (!path || path === null) throw new Error('Path is required');
	if (!fetcher || fetcher === null) throw new Error('Fetcher is required');

	const { data, error, mutate, isLoading, isValidating } = useSwr(path, fetcher, {
		revalidateIfStale: reloadIfStale,
		revalidateOnFocus: reloadOnFocus,
		revalidateOnReconnect: reloadOnReconnect,
		revalidateOnMount: revalidateOnMount,
		refreshInterval: RevalidateInterval ? RevalidateInterval * 60 * 1000 : undefined
	});

	return { data, error, mutate, isLoading, isValidating };
};
