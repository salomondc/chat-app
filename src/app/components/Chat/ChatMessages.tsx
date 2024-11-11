"use client";
import { chatData } from "../../chat/[slug]/chatData";
import { ChatResponse } from "./ChatResponse";
import { ChatQuestion } from "./ChatQuestion";
import { AudioRecording } from "./AudioRecording";

export const ChatMessages: React.FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className="flex flex-col gap-2 m-5 w-full">
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
		</div>
	);
};
