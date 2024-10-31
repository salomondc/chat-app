"use client";
import {
	ChatContainer,
	ChatHeader,
	ChatInput,
	ChatVersion,
	LoginContainer,
	WelcomeMessage,
} from "./components";
import { useNoHoverOnMobile } from "./utils/useNoHoverOnMobile";

export default function Home() {
	useNoHoverOnMobile();
	return (
		<div className="flex min-h-[100dvh]">
			<LoginContainer />
			<div className="flex flex-grow max-lg:hidden">
				<ChatContainer>
					<ChatHeader />
					<div className="flex flex-grow">
						<WelcomeMessage />
					</div>
					<ChatInput />
					<ChatVersion />
				</ChatContainer>
			</div>
		</div>
	);
}
