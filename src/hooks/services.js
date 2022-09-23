import useSWR from 'swr';
import { useEffect } from 'react';
import Router from "next/router";

const LOGIN_PAGE = '/auth/login'
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const fetcher = async (url, payload) => {
	const options = {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			// accept: "application/json",
			"Content-Type": "application/json",
		},
		credentials: 'include',
	};
	return fetch(url, options).then(res => res.json());
};

export const useApi = ({ endpoint, body, path }) => {
	const customPath = path || '/web/dataset/'
	const url = BASE_API_URL + customPath + endpoint;
	const { data, error, revalidate, isValidating, mutate } = useSWR(
		[url, body],
		fetcher,
		{
			revalidateOnFocus: true,
		},
	);
	return { data, error, revalidate, isValidating, mutate };
};

export const useLogout = () => {
	const url = BASE_API_URL + '/web/session/destroy'
	try {
		const data = fetcher(url, {}).then(result => Router.push(LOGIN_PAGE))

	} catch (err) {
		console.log('api error')
	}
};
export const usePostAuth = (params) => {
	const url = BASE_API_URL + '/web/session/authenticate'
	try {
		// const data = fetcher(url, params)
		const data = { result: [] }

		return data

	} catch (err) {
		console.log('api error')
	}
};

export const useAuthSession = () => {
	const url = BASE_API_URL + '/web/session/get_session_info';
	// const { data, error } = useSWR(
	// 	[url, {}],
	// 	fetcher,
	// 	{
	// 		revalidateOnFocus: true,
	// 	},
	// );
	const { data, error } = { data: { result: [] }, error: false }
	useEffect(() => {
		if ((data && data.error) || error) Router.push(LOGIN_PAGE);
	}, [data]);
	// TODO handle error 500 (server down)
	// if (error) Router.push('/500')
	return data?.result;
}

export const useAuthCheck = () => {

	const url = BASE_API_URL + '/web/session/get_session_info';
	const { data, error } = useSWR(
		[url, {}],
		fetcher,
		{
			revalidateOnFocus: true,
		},
	);

	useEffect(() => {
		if (!data || data.error) Router.push("/auth/login");
	}, [data]);
	return data;
}

export const updateDeploymentLineRecord = async ({ params }) => {
	const url = BASE_API_URL + '/web/dataset/call'
	const res = await fetch(url, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	})

	if (res.error) {
		const error = new Error('An error occurred while fetching the data.')
		// Attach extra info to the error object.
		error.info = await res.json()
		error.status = res.status
		throw error
	}

	return res.json()
};

export const usePostAuthAxios = () => {
	const endpoint = BASE_API_URL + '/web/session/authenticate'
	const params = {
		"params": {
			"db": "aiguebelle_react_v1.0",
			"login": "admin",
			"password": "ahmeddemo"
		}
	}

	return axios.post(endpoint, JSON.stringify(params))
};
