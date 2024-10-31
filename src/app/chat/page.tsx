"use client";

import {
	ChatContainer,
	ChatInput,
	ChatVersion,
	ChatUserHeader,
	ChatHistoryContainer,
	ChatPlaceholder,
} from "@/components";
import { MenuProvider } from "@/context/Menu";
import { useNoHoverOnMobile } from "@/utils/useNoHoverOnMobile";

export default function Chat() {
	useNoHoverOnMobile();

	return (
		<div className="flex min-h-[100dvh]">
			<MenuProvider>
				<ChatHistoryContainer />
				<div className="flex flex-grow">
					<ChatContainer>
						<ChatUserHeader />
						<div className="flex flex-grow">
							<ChatPlaceholder />
						</div>
						<div className="border-t md:hidden" />
						<ChatInput />
						<ChatVersion />
					</ChatContainer>
				</div>
			</MenuProvider>
		</div>
	);
}
