"use client";
import { Icons } from "@/components";
import { useMenu } from "@/context/Menu";
import { Button, IconButton } from "@mui/material";
import { ChatHistory } from "./ChatHistory";
import { UserPlan } from "./UserPlan";
import { MenuOptions } from "./MenuOptions";
import { useParams, useRouter } from "next/navigation";
import { useMobileCheck } from "@/utils/useMobileCheck";
import { useNoHoverOnMobile } from "@/utils/useNoHoverOnMobile";
import { useContent } from "@/context/Content";
import { ChatScenarios } from "./ChatScenarios";

export const ChatHistoryContainer = () => {
	const { content } = useContent();
	const { isOpen, setIsOpen } = useMenu();
	const { isMobile } = useMobileCheck();
	const router = useRouter();
	const slug = useParams().slug as string;
	useNoHoverOnMobile();

	const waitForAnimationOnMobile = (url: string) => {
		if (isMobile) {
			setIsOpen(false);
			setTimeout(() => {
				router.push(url);
			}, 500);
		} else {
			router.push(url);
		}
	};

	return (
		<div
			className={`relative max-md:min-w-0 ${
				isOpen ? "min-w-[24px]" : "min-w-[366px]"
			} transition-all flex flex-col gap-5 duration-500`}>
			<div
				className={`min-w-[366px] flex flex-col gap-5 h-[100dvh] p-6 absolute right-0 top-0 max-md:bg-background max-md:z-20 max-md:min-w-[100vw] max-md:transition-all max-md:duration-500 ${
					isOpen ? "max-md:translate-x-full" : ""
				}`}>
				<IconButton
					onClick={() => setIsOpen(false)}
					className="z-50 absolute top-4 right-5 md:hidden">
					<Icons.Close className="text-dark w-6 h-6" />
				</IconButton>
				<div className="flex mx-auto gap-2 items-center">
					<img
						src={content.logo_url}
						alt="logo"
						className="size-12 -my-4"
					/>
					<span className="text-lg font-bold">{content.logo_name}</span>
				</div>
				<Button
					onClick={() => waitForAnimationOnMobile("/chat")}
					aria-label="new chat"
					variant="outlined"
					className="flex gap-2 text-lg font-semibold normal-case font-urbanist text-primary-100 border-primary-100 bg-primary-100/10 rounded-xl">
					New Chat <Icons.Add />
				</Button>
				<div className="flex">
					<IconButton aria-label="search">
						<Icons.Search />
					</IconButton>
					<IconButton
						aria-label="settings"
						className="ml-auto">
						<Icons.Settings />
					</IconButton>
				</div>
				<div className="flex-grow flex flex-col gap-5 overflow-auto">
					<ChatScenarios slug={slug} />
					<ChatHistory slug={slug} />
				</div>
				<MenuOptions />
				<UserPlan />
			</div>
		</div>
	);
};
