"use client";

import {
	ChatContainer,
	ChatHistoryContainer,
	ChatInput,
	ChatUserHeader,
	ChatVersion,
} from "@/components";
import { MenuProvider } from "@/context/Menu";
import { MessagesProvider } from "@/context/Messages";
import { useNoHoverOnMobile } from "@/utils/useNoHoverOnMobile";
import { usePathname } from "next/navigation";

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	useNoHoverOnMobile();
	return (
		<div className="flex min-h-[100dvh]">
			<MenuProvider>
				<MessagesProvider>
					<ChatHistoryContainer />
					<div className="flex flex-grow">
						<ChatContainer>
							<ChatUserHeader />
							{children}
							<div className="border-t md:hidden" />
							<ChatInput disabled={pathname === "/chat"} />
							<ChatVersion />
						</ChatContainer>
					</div>
				</MessagesProvider>
			</MenuProvider>
		</div>
	);
}
