"use client";
import { Icons } from "@/components";
import { useMenu } from "@/context/Menu";
import { IconButton } from "@mui/material";
import { FloatingLogoutMenu } from "./FloatingLogoutMenu";
import { useAuth } from "@/context/Auth";

export const ChatUserHeader = () => {
	const { setIsOpen } = useMenu();
	const { authData } = useAuth();
	return (
		<div className="border-b">
			<div className="flex items-center justify-center relative my-1 max-md:my-3">
				<IconButton
					aria-label="expand"
					onClick={() => setIsOpen((x) => !x)}
					className="ml-2 max-md:ml-3">
					<Icons.Maximize className="max-md:hidden" />
					<Icons.Menu className="md:hidden" />
				</IconButton>
				<span className="text-xl font-semibold mx-auto leading-none max-md:text-base text-center px-4">
					Welcome back, {authData.user_name}
				</span>
				<FloatingLogoutMenu />
			</div>
		</div>
	);
};
