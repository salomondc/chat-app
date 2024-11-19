"use client";
import { ContentProvider } from "@/context/Content";
import { MenuProvider } from "@/context/Menu";
import { MessagesProvider } from "@/context/Messages";
import { useNoHoverOnMobile } from "@/utils/useNoHoverOnMobile";

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useNoHoverOnMobile();
	return (
		<div className="flex min-h-[100dvh]">
			<ContentProvider>
				<MenuProvider>
					<MessagesProvider>{children}</MessagesProvider>
				</MenuProvider>
			</ContentProvider>
		</div>
	);
}
