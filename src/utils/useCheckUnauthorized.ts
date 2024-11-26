import { useAuth } from "@/context/Auth";
import { useNotification } from "@/context/Notification";
import { useEffect } from "react";

export const useCheckUnauthorized = () => {
	const { logout, isSuccessLogout, resetLogout } = useAuth();
	const { showNotification, finishLoading } = useNotification();

	const notifyUnauthorized = (auth_error?: string) => {
		showNotification({
			description:
				"Your credentials are invalid. You will be redirected to the login page.",
			excerpt: auth_error,
			isLoading: true,
			onClose: logout,
		});
	};

	useEffect(() => {
		if (isSuccessLogout) {
			finishLoading();
			resetLogout();
		}
	}, [isSuccessLogout]);

	return {
		notifyUnauthorized,
	};
};
