import { useQuery } from "@tanstack/react-query";
import { UnauthorizedResponse, api } from ".";
import { ContentContextType } from "@/context/Content";
import { queryOptions } from ".";
import { useAuth } from "@/context/Auth";

export const fetchContentData = async (
	sessionId: string,
	csrfToken: string
) => {
	const response = await api.get("/ui/app/ajax/interface_info.php", {
		headers: {
			"Session-ID": sessionId,
			"CSRF-Token": csrfToken,
		},
	});
	return response.data;
};

export const useContentData = () => {
	const { authData, isAuth } = useAuth();
	return useQuery<ContentContextType & UnauthorizedResponse>({
		queryKey: ["content"],
		queryFn: () => fetchContentData(authData.session_id!, authData.csrf_token!),
		enabled: isAuth,
		...queryOptions,
		staleTime: 1000 * 60 * 2,
	});
};
