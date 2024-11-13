"use client";
import { chatData } from "@/app/chat/[slug]/chatData";
import { ChatResponse } from "./ChatResponse";
import { ChatQuestion } from "./ChatQuestion";
import { AudioRecording } from "./AudioRecording";
import { useMessages } from "@/context/Messages";
import { useEffect } from "react";

export const ChatMessages: React.FC<{ slug: string }> = ({ slug }) => {
	const { messages } = useMessages();

	useEffect(() => {
		const chatCtr = document.getElementById("chat-container");
		chatCtr?.scrollTo({ top: chatCtr.scrollHeight, behavior: "smooth" });
	}, [messages]);

	return (
		<div
			id="chat-container"
			className="flex flex-col gap-2 p-5 w-full flex-grow overflow-auto">
			{chatData[Number(slug) as keyof typeof chatData].messages.map(
				(message) => {
					switch (message.author) {
						case "user":
							return (
								<ChatQuestion
									key={message.text}
									text={message.text}
									time={message.time}
								/>
							);
						case "bot":
							return (
								<ChatResponse
									key={message.text}
									text={message.text}
									time={message.time}
								/>
							);
					}
				}
			)}
			<div className="flex flex-col ml-auto gap-1">
				<div className="bg-gray-100 px-3 py-2 rounded-xl max-w-3xl flex items-center gap-2">
					<AudioRecording />
				</div>
				<div className="ml-auto text-sm text-dark-secondary">23:59</div>
			</div>
			{messages.map((message, i) => {
				if (message.user_message) {
					return (
						<ChatQuestion
							pending={!message.agent_status}
							key={message.user_message + i.toString()}
							text={message.user_message}
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
