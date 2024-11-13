"use client";
import { getLatestMessage } from "@/api/chat";
import { Icons } from "@/components";
import { useMessages } from "@/context/Messages";
import { IconButton } from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
			return query.state.data?.agent_status == "agent_thinking" ? 3000 : false;
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
			<div className="flex flex-col mr-auto gap-1">
				<div className="border px-3 py-2 rounded-xl max-w-3xl">
					{pending ? <Icons.Loading /> : text}
				</div>
				<div className={`flex items-center ${pending ? "hidden" : ""}`}>
					<IconButton aria-label="copy">
						<Icons.Copy />
					</IconButton>
					<IconButton aria-label="speech">
						<Icons.Volume />
					</IconButton>
					<IconButton aria-label="refresh">
						<Icons.Refresh />
					</IconButton>
					<IconButton aria-label="like">
						<Icons.Like />
					</IconButton>
					<IconButton aria-label="dislike">
						<Icons.Dislike />
					</IconButton>
					<span className="mx-3 text-primary-100 hover:underline cursor-pointer active:opacity-50 select-none text-sm">
						See translation
					</span>
					<div className="ml-auto text-sm text-dark-secondary">{time}</div>
				</div>
			</div>
		</div>
	);
};
