"use client";
import { userLogout } from "@/api/login";
import { Icons } from "@/components";
import { useAuth } from "@/context/Auth";
import { Button, IconButton, Popover } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FloatingLogoutMenu = ({}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const { clearCookies, setAuth } = useAuth();
	const router = useRouter();

	const { mutate: logout, isPending } = useMutation({
		mutationFn: userLogout,
		onSuccess: () => {
			router.push("/");
		},
	});

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAuth({});
		clearCookies();
		logout();
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
				<Image
					src={"/pfp.png"}
					height={44}
					width={44}
					alt="pfp"
				/>
				<div className="bg-white p-0.5 absolute -right-1 -bottom-1 rounded-full border border-tertiary/20">
					<Icons.Notification className="w-4 h-4 text-tertiary " />
				</div>
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
					onClick={handleLogout}
					className={`${
						isPending ? "" : "min-w-64"
					} flex justify-start px-3 py-2 text-foreground hover:bg-light-gray normal-case font-urbanist text-base font-normal gap-2`}>
					{isPending ? (
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
