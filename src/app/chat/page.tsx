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
import { useEffect } from "react";

export default function Chat() {
	const { isLoading } = useContent();

	useEffect(() => {
		window.onerror = (event, source, lineno, colno, error) => {
			console.log(event, source, lineno, colno, error);
		};
	}, []);

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
