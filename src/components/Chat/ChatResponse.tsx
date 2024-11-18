"use client";
import { getLatestMessage } from "@/api/chat";
import { Icons } from "@/components";
import { useMessages } from "@/context/Messages";
import { IconButton } from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface Props {
	text: string;
	time: string;
	pending?: boolean;
}

export const ChatResponse: React.FC<Props> = ({ text, time, pending }) => {
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
					<div className="border px-3 py-2 rounded-xl max-w-[calc(100dvw-30rem)] max-md:max-w-[calc(100dvw-85px)] prose">
						<MarkdownRenderer>{text}</MarkdownRenderer>
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
