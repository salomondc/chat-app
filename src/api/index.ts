import axios from "axios";

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
});

export const queryOptions = {
	staleTime: 1000 * 60 * 5,
	cacheTime: 1000 * 60 * 10,
	refetchOnWindowFocus: false,
};
