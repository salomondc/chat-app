import { api } from ".";

export const getSite = async (siteUrl: string) => {
	const response = await api.get<string>("/api/" + siteUrl);

	return response.data;
};
