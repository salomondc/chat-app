import { createFormData } from "@/utils/createFormData";
import { api } from ".";

interface LoginData {
	user: string;
	pass: string;
}

interface LoginResponse {
	success: boolean;
	user: {
		name: string;
		id: number;
	} | null;
	session_id?: string;
	csrf_token?: string;
	message: string;
	scenario_id?: string;
	redirect?: string;
}

export const userLogin = async ({ pass, user }: LoginData) => {
	const response = await api.post<LoginResponse | undefined>(
		"/ui/app/ajax/react_login.php",
		createFormData({
			action: "login",
			pass,
			user,
		})
	);
	return response.data;
};

export const userLogout = async () => {
	const response = await api.post(
		"/ui/app/ajax/react_login.php",
		createFormData({
			action: "logout",
		})
	);
	return response.data;
};
