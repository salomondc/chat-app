"use client";
import { ChatResponse } from "./ChatResponse";
import { ChatQuestion } from "./ChatQuestion";
import { useMessages } from "@/context/Messages";
import { useEffect } from "react";

export const ChatMessages: React.FC = () => {
	const { messages } = useMessages();

	useEffect(() => {
		const chatCtr = document.getElementById("chat-container");
		chatCtr?.scrollTo({ top: chatCtr.scrollHeight, behavior: "smooth" });
	}, [messages]);

	return (
		<div
			id="chat-container"
			className="flex flex-col gap-2 p-5 w-full flex-grow overflow-auto">
			{messages.map((message, i) => {
				if (message.user_message || message.pictures) {
					return (
						<ChatQuestion
							pending={!message.agent_status}
							key={message.user_message + i.toString()}
							text={message.user_message || ""}
							images={message.pictures || []}
							time="0:00"
						/>
					);
				}
				if (message.agent_message) {
					return (
						<ChatResponse
							pending={!message.agent_status}
							key={message.agent_message + i.toString()}
							text={message.agent_message}
							time="0:00"
						/>
					);
				}
			})}
		</div>
	);
};
