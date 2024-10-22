import { useCallback, useState } from 'react';

const baseURL = import.meta.env.VITE_API_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface useFetchPayload<T> {
	data: T | null;
	fetchData: (param?: string) => Promise<T | null | undefined>;
	isLoading: boolean;
	error: any;
}

/**
 * Fetches an specific endpoint given.
 * @param method the request method. (GET | POST | PUT | DELETE)
 * @param path the endpoint path to fetch. Don't include Base Url
 * @param payload the body for the request if needed
 * @param signal an Abort Signal to handle request abortion.
 *
 * @returns Returns an object with the fetched data variable, a callback function to execute the fetch action, a isLoading boolean and errors object.
 */
export function useFetch<T, P = any>(method: HttpMethod, path: string, payload?: P, signal?: AbortSignal): useFetchPayload<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(
		async (param?: string) => {
			const _path = param ? `${path}${`/${param}`}` : path;

			setError(null);
			setIsLoading(true);

			try {
				const response = await fetch(`${baseURL}${_path}`, {
					method,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: payload ? new URLSearchParams(payload) : undefined,
					signal
				});

				setData(await response.json());

				return data;
			} catch (error: any) {
				setData(null);
				setError(error.message);
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[method, path, payload, signal]
	);

	return { data, fetchData, isLoading, error };
}
