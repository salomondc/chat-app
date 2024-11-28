"use client";
import { useAuth } from "@/context/Auth";
import { ContentProvider } from "@/context/Content";
import { MenuProvider } from "@/context/Menu";
import { useNoHoverOnMobile } from "@/utils/useNoHoverOnMobile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { validate } = useAuth();
	const router = useRouter();
	useNoHoverOnMobile();

	useEffect(() => {
		if (!validate()) {
			router.push("/");
		}
	}, []);

	return (
		<div className="flex min-h-[100dvh]">
			<ContentProvider>
				<MenuProvider>{children}</MenuProvider>
			</ContentProvider>
		</div>
	);
}
