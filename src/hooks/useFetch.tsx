import { useCallback, useState } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface useFetchPayload<T, P> {
	data: T | null;
	fetchData: (fetchDataConfig?: IFetchDataConfig<P>) => Promise<T | null | undefined>;
	isLoading: boolean;
	error: any;
}

interface IFetchDataConfig<P> {
	payload?: P;
	routeParam?: string;
	queryParams?: URLSearchParams;
	fetchConfigOverride?: RequestInit;
}

const baseURL = import.meta.env.VITE_API_URL;

/**
 * Fetches an specific endpoint given.
 * @param method the request method. (GET | POST | PUT | DELETE)
 * @param path the endpoint path to fetch. Don't include Base Url
 * @param payload the body for the request if needed
 * @param signal an Abort Signal to handle request abortion.
 *
 * @returns Returns an object with the fetched data variable, a callback function to execute the fetch action, a isLoading boolean and errors object.
 */
export function useFetch<T, P = any>(method: HttpMethod, path: string): useFetchPayload<T, P> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(
		async (fetchDataConfig?: IFetchDataConfig<P>) => {
			const _path = fetchDataConfig?.routeParam ? `${path}${`/${fetchDataConfig?.routeParam}`}` : path;
			const queryString = fetchDataConfig?.queryParams ? new URLSearchParams(fetchDataConfig?.queryParams).toString() : null;

			setError(null);
			setIsLoading(true);

			try {
				const response = await fetch(`${baseURL}${_path}${queryString ? '?' + queryString : ''}`, {
					method,
					headers: {
						'Content-Type': 'application/json'
					},
					body: fetchDataConfig?.payload ? JSON.stringify(fetchDataConfig?.payload) : undefined,
					...fetchDataConfig?.fetchConfigOverride
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
		[method, path]
	);

	return { data, fetchData, isLoading, error };
}
