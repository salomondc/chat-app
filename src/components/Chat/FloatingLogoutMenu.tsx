"use client";
import { Icons } from "@/components";
import { useAuth } from "@/context/Auth";
import { useContent } from "@/context/Content";
import { Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";

export const FloatingLogoutMenu = ({}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const { logout, isPendingLogout } = useAuth();
	const { content } = useContent();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "user-menu" : undefined;

	return (
		<>
			<IconButton
				aria-describedby={id}
				aria-label="user menu"
				edge="start"
				onClick={handleClick}
				className="relative mr-5 p-0">
				<img
					src={content.user_pic}
					height={44}
					width={44}
					alt="pfp"
				/>
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				className="translate-y-4 translate-x-2"
				slotProps={{
					paper: {
						className:
							"shadow-[1px_1px_2px_rgba(0,0,0,0.06)] border bg-background rounded-xl",
					},
				}}>
				<Button
					onClick={logout}
					className={`${
						isPendingLogout ? "" : "min-w-64"
					} flex justify-start px-3 py-2 text-foreground hover:bg-light-gray normal-case font-urbanist text-base font-normal gap-2`}>
					{isPendingLogout ? (
						<>
							<Icons.Loading />
						</>
					) : (
						<>
							<Icons.Leave className="text-dark-secondary" />
							Logout
						</>
					)}
				</Button>
			</Popover>
		</>
	);
};
