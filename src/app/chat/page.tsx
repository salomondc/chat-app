"use client";
import {
	ChatContainer,
	ChatHistoryContainer,
	ChatPlaceholder,
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
							<ChatPlaceholder />
							<ChatVersion />
						</ChatContainer>
					</div>
				</>
			)}
		</>
	);
}
