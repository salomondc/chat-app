import axios from "axios";

export const api = axios.create({
	baseURL: "/api",
	headers: {
		Cookie: "PHPSESSID=b346f9a62e30f138bb2c3b48ee63ca2c",
	},
});

export const queryOptions = {
	staleTime: 1000 * 60 * 5,
	cacheTime: 1000 * 60 * 10,
	refetchOnWindowFocus: false,
};
