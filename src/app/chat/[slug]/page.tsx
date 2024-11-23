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

export default function SavedChat() {
	const { isLoading } = useContent();

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
