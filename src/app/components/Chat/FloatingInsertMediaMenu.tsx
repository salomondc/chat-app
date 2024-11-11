"use client";
import { Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { Icons } from "..";

export const FloatingInsertMediaMenu = ({}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	// Hide ID so e-readers don't detect the menu if it's closed
	const id = open ? "insert-menu" : undefined;

	return (
		<>
			<IconButton
				size="small"
				aria-describedby={id}
				aria-label="insert attachment"
				edge="start"
				className={`px-2 mx-0.5 ${open ? "bg-black/5" : ""}`}
				onClick={handleClick}>
				<Icons.Paperclip />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				className="-mt-2 -ml-[3px]"
				slotProps={{
					paper: {
						className:
							"shadow-[1px_1px_2px_rgba(0,0,0,0.06)] border bg-background rounded-xl",
					},
				}}>
				<div>
					<Button className="min-w-64 flex justify-start px-3 py-2 text-foreground hover:bg-light-gray normal-case font-urbanist text-base font-normal gap-2">
						<Icons.Camera />
						Photo
					</Button>
					<div className="border-t" />
					<Button className="min-w-64 flex justify-start px-3 py-2 text-foreground hover:bg-light-gray normal-case font-urbanist text-base font-normal gap-2">
						<Icons.Microphone />
						Audio
					</Button>
					<div className="border-t" />
					<Button className="min-w-64 flex justify-start px-3 py-2 text-foreground hover:bg-light-gray normal-case font-urbanist text-base font-normal gap-2">
						<Icons.DocumentUpload />
						Select file
						<span className="text-xs text-dark-secondary ml-auto">
							max 10MB
						</span>
					</Button>
				</div>
			</Popover>
		</>
	);
};
