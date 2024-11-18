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
import Link from "next/link";

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useNoHoverOnMobile();
	return (
		<div className="flex min-h-[100dvh]">
			<MenuProvider>
				<MessagesProvider>
					<ChatHistoryContainer />
					<div className="flex flex-grow">
						<ChatContainer>
							<ChatUserHeader />
							<span className="text-sm text-gray-500 text-center italic m-4">
								How may i help you today? <br /> For details you can send{" "}
								<b>/help</b> or review the{" "}
								<Link
									href={"#"}
									className="text-primary-100 hover:underline">
									documentation
								</Link>
							</span>
							{children}
							<div className="border-t md:hidden" />
							<ChatInput />
							<ChatVersion />
						</ChatContainer>
					</div>
				</MessagesProvider>
			</MenuProvider>
		</div>
	);
}
