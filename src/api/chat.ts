import { Message } from "@/context/Messages";
import { api } from ".";

export const getLatestMessage = async () => {
	const response = await api.post<Message | undefined>("/agents_test/run", {
		agent_mode: "check_for_response",
	});
	return response.data;
};

export const sendMessage = async (message: string) => {
	const response = await api.post<Message>("/agents_test/run", {
		agent_mode: "user_message",
		pictures: "[]",
		message,
	});
	return response.data;
};
