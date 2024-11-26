"use client";
import {
	ChatContainer,
	ChatHistoryContainer,
	ChatInput,
	ChatMessages,
	ChatUserHeader,
	ChatVersion,
	Icons,
} from "@/components";
import { useContent } from "@/context/Content";
import { useMessages } from "@/context/Messages";
import { kebabCase } from "change-case";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function SavedChat() {
	const { slug } = useParams() as { slug: string };
	const { isLoading, content } = useContent();
	const { messages, setMessages } = useMessages();

	useEffect(() => {
		if (messages.length) {
			setMessages([]);
		}
	}, [slug]);

	return (
		<>
			{isLoading ? (
				<div className="h-screen w-screen flex items-center justify-center gap-2 flex-col">
					<Icons.Loading />
				</div>
			) : (
				<>
					<ChatHistoryContainer />
					<div className="flex flex-grow">
						<ChatContainer>
							<ChatUserHeader />
							<div className="p-2 italic border-b flex justify-center">
								{
									content.tool_buttons.find(
										(btn) => kebabCase(btn.name) == slug
									)?.name
								}
							</div>
							<ChatMessages />
							<div className="border-t md:hidden" />
							<ChatInput />
							<ChatVersion />
						</ChatContainer>
					</div>
				</>
			)}
		</>
	);
}
