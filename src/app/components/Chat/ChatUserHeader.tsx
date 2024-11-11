"use client";
import { Icons } from "@/components";
import { useMenu } from "@/context/Menu";
import { IconButton } from "@mui/material";
import { FloatingLogoutMenu } from "./FloatingLogoutMenu";

export const ChatUserHeader = () => {
	const { setIsOpen } = useMenu();
	return (
		<div className="border-b">
			<div className="flex items-center justify-center relative my-1">
				<IconButton
					aria-label="expand"
					onClick={() => setIsOpen((x) => !x)}
					className="ml-2">
					<Icons.Maximize className="max-md:hidden" />
					<Icons.Menu className="md:hidden" />
				</IconButton>
				<span className="text-xl font-semibold mx-auto leading-none max-md:text-base text-center">
					Welcome back, John Doe
				</span>
				<FloatingLogoutMenu />
			</div>
		</div>
	);
};
