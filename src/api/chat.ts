import { UnauthorizedResponse, api } from ".";

interface GetLatestResponseArgs {
	agent?: string;
	sessionId: string;
	csrfToken: string;
}

export const getLatestResponse = async ({
	agent,
	csrfToken,
	sessionId,
}: GetLatestResponseArgs) => {
	const response = await api.post<MessageData & UnauthorizedResponse>(
		"/agents_test/run",
		{
			agent_mode: "check_for_response",
			agent: agent || "task_dispatcher",
		},
		{
			headers: {
				"Session-ID": sessionId,
				"CSRF-Token": csrfToken,
			},
		}
	);

	const agent_message = response.data.agent_message;

	return {
		...response.data,
		agent_message: agent_message
			? (JSON.parse(agent_message) as AgentMessage)
			: undefined,
	};
};

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

interface sendMessageData {
	pictures: string[];
	message: string;
	agent?: string;
	sessionId: string;
	csrfToken: string;
}

export const sendMessage = async (data: sendMessageData) => {
	const response = await api.post<MessageData & UnauthorizedResponse>(
		"/agents_test/run",
		{
			agent_mode: "user_message",
			agent: data.agent || "task_dispatcher",
			hidden: false,
			pictures: JSON.stringify(data.pictures),
			message: data.message,
		},
		{
			headers: {
				"Session-ID": data.sessionId,
				"CSRF-Token": data.csrfToken,
			},
		}
	);

	return response.data;
};
