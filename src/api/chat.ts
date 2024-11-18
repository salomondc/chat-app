import { Message } from "@/context/Messages";
import { api } from ".";

export const getLatestMessage = async () => {
	const response = await api.post<Message | undefined>("/agents_test/run", {
		agent_mode: "check_for_response",
	});
	return response.data;
};

interface sendMessageData {
	pictures: string[];
	message: string;
}

export const sendMessage = async (data: sendMessageData) => {
	const response = await api.post<Message>("/agents_test/run", {
		agent_mode: "user_message",
		pictures: data.pictures,
		message: data.message,
	});
	return response.data;
};
