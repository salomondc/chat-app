"use client";
import { AgentMessage, getLatestResponse } from "@/api/chat";
import { Button, Icons } from "@/components";
import { useMessages } from "@/context/Messages";
import { IconButton } from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useSendMessage } from "@/utils/useSendMessage";
import { useAuth } from "@/context/Auth";
import { useErrorNotification } from "@/context/Notification";
import { useCheckUnauthorized } from "@/utils/useCheckUnauthorized";
import { useParams } from "next/navigation";
import { useContent } from "@/context/Content";
import { kebabCase } from "change-case";

interface Props {
	text: string;
	time: string;
	pending?: boolean;
	options: AgentMessage["options"];
}

export const ChatResponse: React.FC<Props> = ({
	text,
	time,
	pending,
	options,
}) => {
	const { messages, setMessages } = useMessages();
	const queryClient = useQueryClient();
	const lastUserMsg = messages.filter((msg) => msg.user_message).slice(-1)[0];
	const { authData, isAuth } = useAuth();
	const { notifyUnauthorized } = useCheckUnauthorized();
	const { slug } = useParams() as { slug: string };
	const { content } = useContent();
	const { data, isFetching, error, isSuccess } = useQuery({
		queryKey: ["agent_message"],
		retry: 0,
		queryFn: () => {
			const scenarioUrlString = content.tool_buttons.find(
				(btn) => kebabCase(btn.name) == slug
			)?.link;
			const scenarioUrl = scenarioUrlString && new URL(scenarioUrlString);
			return getLatestResponse({
				agent: lastUserMsg.agent,
				csrfToken: authData.csrf_token!,
				sessionId: authData.session_id!,
				scenario: scenarioUrl
					? scenarioUrl?.pathname + scenarioUrl?.search
					: undefined,
			});
		},
		enabled: Boolean(pending) && isAuth,
		refetchInterval: (query) => {
			return query.state.data?.agent_message ? false : 1000;
		},
		refetchOnWindowFocus: false,
	});
	useErrorNotification({
		error,
		notification: {
			description:
				"Something went wrong when trying to recieve the chat response.",
			onOpen: () => {
				setMessages((prev) => prev.slice(0, -1));
			},
		},
	});
	const { send } = useSendMessage();

	const handleOptionSelect = (task: string, agent: string) => {
		send(task, [], agent);
	};

	useEffect(() => {
		if (data?.agent_message && pending && !isFetching) {
			setMessages((prev) => {
				const newArr = [...prev];
				const last = newArr.length - 1;
				newArr[last] = data;
				return newArr;
			});
		}
		if (isSuccess && data?.auth === false) {
			setMessages((prev) =>
				prev.filter((x) => x.agent_message?.message != ".")
			);
			notifyUnauthorized(data.auth_error);
		}
	}, [data]);

	useEffect(() => {
		if (!pending) {
			queryClient.invalidateQueries({ queryKey: ["agent_message"] });
		}
	}, [pending]);

	return (
		<div className="mr-auto flex gap-2">
			<Icons.Logo className="shrink-0" />
			<div className="flex flex-col mr-auto gap-1 max-w-4xl">
				{pending ? (
					<div className="border px-3 py-2 rounded-xl">
						<Icons.Loading />
					</div>
				) : (
					<div className="border px-3 py-2 rounded-xl max-w-[calc(100dvw-30rem)] max-md:max-w-[calc(100dvw-85px)] prose flex flex-col">
						<MarkdownRenderer>{text}</MarkdownRenderer>
						{!!options.length && (
							<div className="-mt-2 mb-2 flex flex-col gap-4">
								{options.map((option, i) => {
									return (
										<div
											key={option.option_title + i}
											className="flex flex-wrap border rounded-xl px-4 py-2 items-center">
											<span className="italic mr-3">{option.option_title}</span>
											<Button
												onClick={() => {
													handleOptionSelect(
														option.option_agent_task,
														option.option_agent
													);
												}}
												className="bg-tertiary hover:opacity-90 text-white normal-case font-urbanist text-base font-semibold flex  px-4 py-2 shadow-none gap-1 ml-auto my-2">
												<span className="text-left">
													{option.option_button_text}
												</span>
												<Icons.ArrorRight className="ml-auto -mr-2 shrink-0" />
											</Button>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
				<div className={`flex items-center ${pending ? "hidden" : ""}`}>
					<IconButton aria-label="copy">
						<Icons.Copy />
					</IconButton>
					<IconButton aria-label="speech">
						<Icons.Volume />
					</IconButton>
					<div className="ml-auto text-sm text-dark-secondary">{time}</div>
				</div>
			</div>
		</div>
	);
};
