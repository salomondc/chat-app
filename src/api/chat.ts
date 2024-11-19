import { api } from ".";

export const getLatestMessage = async () => {
	const response = await api.post<MessageData>("/agents_test/run", {
		agent_mode: "check_for_response",
		agent: "task_dispatcher",
	});

	const agent_message = response.data.agent_message;

	return {
		...response.data,
		agent_message: agent_message
			? (JSON.parse(agent_message) as AgentMessage)
			: undefined,
	};
};

interface sendMessageData {
	pictures: string[];
	message: string;
}

export interface AgentMessage {
	message: string;
	options: Array<{
		option_title: string;
		option_button_text: string;
		option_agent_task: string;
		option_agent: string;
	}>;
}

interface MessageData {
	agent_status?: string;
	user_message?: string;
	agent_message?: string;
	pictures?: string[];
}

export const sendMessage = async (data: sendMessageData) => {
	const response = await api.post<MessageData>("/agents_test/run", {
		agent_mode: "user_message",
		agent: "task_dispatcher",
		hidden: false,
		pictures: JSON.stringify(data.pictures),
		message: data.message,
	});

	return response.data;
};
