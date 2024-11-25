"use client";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

interface AuthData {
	scenario_id?: string;
	user_id?: number;
	session_id?: string;
	csrf_token?: string;
	user_name?: string;
}

interface AuthContextType {
	authData: AuthData;
	isAuth: boolean;
	validate: () => boolean;
	setCookies: (data: AuthData) => void;
	clearCookies: () => void;
	setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

const AuthContext = createContext<AuthContextType>({
	authData: {},
	isAuth: false,
	setAuth: () => {},
	setCookies: () => {},
	clearCookies: () => {},
	validate: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [authData, setAuth] = useState<AuthData>({});

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

	return (
		<AuthContext.Provider
			value={{ authData, setAuth, isAuth, validate, setCookies, clearCookies }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
