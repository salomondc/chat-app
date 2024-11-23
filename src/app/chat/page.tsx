"use client";
import {
	ChatContainer,
	ChatHistoryContainer,
	ChatInput,
	ChatMessages,
	ChatUserHeader,
	ChatVersion,
	FullScreenLoading,
} from "@/components";
import { useContent } from "@/context/Content";

export default function Chat() {
	const { isLoading } = useContent();

	return (
		<>
			{isLoading ? (
				<FullScreenLoading />
			) : (
				<>
					<ChatHistoryContainer />
					<div className="flex flex-grow">
						<ChatContainer>
							<ChatUserHeader />
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
