"use client";
import { Icons } from "@/components";
import { useMenu } from "@/context/Menu";
import { IconButton } from "@mui/material";
import { UserPlan } from "./UserPlan";
import { MenuOptions } from "./MenuOptions";
import { useParams } from "next/navigation";
import { useNoHoverOnMobile } from "@/utils/useNoHoverOnMobile";
import { useContent } from "@/context/Content";
import { ChatScenarios } from "./ChatScenarios";

export const ChatHistoryContainer = () => {
	const { content } = useContent();
	const { isOpen, setIsOpen } = useMenu();
	const slug = useParams().slug as string;
	useNoHoverOnMobile();

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
				<MenuOptions />
				<div className="flex-grow flex flex-col gap-5 overflow-auto">
					<ChatScenarios slug={slug} />
				</div>
				<UserPlan />
			</div>
		</div>
	);
};
