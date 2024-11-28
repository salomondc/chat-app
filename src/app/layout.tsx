import type { Metadata, Viewport } from "next";
import "../globals.css";
import { ReactQueryProvider } from "@/context/reactQueryProvider";
import { AuthProvider } from "@/context/Auth";
import { NotificationProvider } from "@/context/Notification";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Lumnar Tech Advisor",
	description:
		"Designed to adapt, learn, and support you across tasks, this AI assistant offers a personalized approach to boost productivity, streamline workflows, and enhance everyday interactions",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	interactiveWidget: "resizes-content",
	userScalable: false,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			style={{ overscrollBehavior: "none" }}>
			<link
				rel="icon"
				href="./favicon.ico"
				type="image/x-icon"
			/>
			<Script src="https://cdn.tailwindcss.com"></Script>
			<body>
				<ReactQueryProvider>
					<NotificationProvider>
						<AuthProvider>{children}</AuthProvider>
					</NotificationProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
