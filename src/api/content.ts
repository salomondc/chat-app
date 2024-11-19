import { useQuery } from "@tanstack/react-query";
import { api } from ".";
import { ContentContextType } from "@/context/Content";
import { queryOptions } from ".";

export const fetchContentData = async () => {
	const response = await api.get("/ui/ajax/interface_info.php");
	return response.data;
};

export const useContentData = () => {
	return useQuery<ContentContextType>({
		queryKey: ["content"],
		queryFn: fetchContentData,
		...queryOptions,
		staleTime: 1000 * 60 * 2,
	});
};
