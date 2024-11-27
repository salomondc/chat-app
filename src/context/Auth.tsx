"use client";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "@/api/login";
import { useRouter } from "next/navigation";
import { getErrorNotificationProps, useNotification } from "./Notification";

interface AuthData {
	scenario_id?: string;
	user_id?: number;
	session_id?: string;
	csrf_token?: string;
	user_name?: string;
	non_existent?: {
		hello: {
			hi: number;
		};
	};
}

interface AuthContextType {
	authData: AuthData;
	isAuth: boolean;
	validate: () => boolean;
	setCookies: (data: AuthData) => void;
	logout: () => void;
	isPendingLogout: boolean;
	isSuccessLogout: boolean;
	resetLogout: () => void;
	setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

const AuthContext = createContext<AuthContextType>({
	authData: {},
	isAuth: false,
	setAuth: () => {},
	setCookies: () => {},
	logout: () => {},
	isPendingLogout: false,
	isSuccessLogout: false,
	resetLogout: () => {},
	validate: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [authData, setAuth] = useState<AuthData>({});
	const router = useRouter();
	const { showNotification } = useNotification();
	const {
		mutate: mutateLogout,
		isPending: isPendingLogout,
		isSuccess: isSuccessLogout,
		reset: resetLogout,
	} = useMutation({
		mutationFn: userLogout,
		onSuccess: () => {
			setAuth({});
			clearCookies();
			router.push("/");
			return;
		},
		onError: (error) => {
			showNotification({
				...getErrorNotificationProps(error),
				description: "Something went wrong when trying to logout.",
			});
		},
	});

	const isAuth = Boolean(authData.session_id);

	const validate = () => {
		const sessionId = Cookies.get("session_id");
		if (!isAuth) {
			setAuth({
				csrf_token: Cookies.get("csrf_token"),
				scenario_id: Cookies.get("scenario_id"),
				session_id: sessionId,
				user_id: Number(Cookies.get("user_id")),
				user_name: Cookies.get("user_name"),
			});
		}
		return !!sessionId;
	};

	const clearCookies = () => {
		Cookies.remove("csrf_token", { path: "" });
		Cookies.remove("session_id", { path: "" });
		Cookies.remove("user_id", { path: "" });
		Cookies.remove("scenario_id", { path: "" });
		Cookies.remove("user_name", { path: "" });
	};

	const setCookies = (data: AuthData) => {
		document.cookie = `csrf_token=${data.csrf_token}; path=/; secure; samesite=strict; max-age=3600`;
		document.cookie = `session_id=${data.session_id}; path=/; secure; samesite=strict; max-age=3600`;
		document.cookie = `user_id=${data.user_id}; path=/; secure; samesite=strict; max-age=3600`;
		document.cookie = `scenario_id=${data.scenario_id}; path=/; secure; samesite=strict; max-age=3600`;
		document.cookie = `user_name=${data.user_name}; path=/; secure; samesite=strict; max-age=3600`;
	};

	const logout = () => {
		mutateLogout();
	};

	return (
		<AuthContext.Provider
			value={{
				authData,
				setAuth,
				isAuth,
				validate,
				setCookies,
				logout,
				isPendingLogout,
				isSuccessLogout,
				resetLogout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
