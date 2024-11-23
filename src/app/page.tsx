"use client";
import {
	ChatContainer,
	ChatHeader,
	ChatInput,
	ChatVersion,
	FullScreenLoading,
	LoginContainer,
	WelcomeMessage,
} from "@/components";
import { useAuth } from "@/context/Auth";
import { useNoHoverOnMobile } from "@/utils/useNoHoverOnMobile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const { validate } = useAuth();
	const router = useRouter();
	useNoHoverOnMobile();

	useEffect(() => {
		if (validate()) {
			router.push("/chat");
		}
		setIsLoading(false);
	}, []);

	return isLoading ? (
		<FullScreenLoading />
	) : (
		<div className="flex min-h-[100dvh]">
			<LoginContainer />
			<div className="flex flex-grow max-lg:hidden">
				<ChatContainer>
					<ChatHeader />
					<div className="flex flex-grow">
						<WelcomeMessage />
					</div>
					<ChatInput disabled />
					<ChatVersion />
				</ChatContainer>
			</div>
		</div>
	);
}
