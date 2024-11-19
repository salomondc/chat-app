"use client";
import { AgentMessage, getLatestMessage } from "@/api/chat";
import { Button, Icons } from "@/components";
import { useMessages } from "@/context/Messages";
import { IconButton } from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useSendMessage } from "@/utils/useSendMessage";

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
	const { setMessages } = useMessages();
	const queryClient = useQueryClient();
	const { data, isFetching } = useQuery({
		queryKey: ["agent_message"],
		queryFn: getLatestMessage,
		enabled: Boolean(pending),
		refetchInterval: (query) => {
			return query.state.data?.agent_message ? false : 3000;
		},
		refetchOnWindowFocus: false,
	});
	const { send } = useSendMessage();

	const handleOptionSelect = (task: string) => {
		send(task);
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
											className="border rounded-xl flex flex-col">
											<span className="px-4 py-2 italic">
												{option.option_title}
											</span>
											<div className="border-t" />
											<Button
												onClick={() => {
													handleOptionSelect(option.option_agent_task);
												}}
												className="bg-white hover:bg-light-gray text-foreground normal-case font-urbanist text-base font-semibold flex justify-start rounded-b-xl rounded-t-none px-4 py-2 shadow-none gap-3">
												<Icons.ViewFinder className="shrink-0 text-gray-500" />
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
