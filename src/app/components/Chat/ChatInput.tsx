"use client";
import { IconButton } from "@mui/material";
import { FloatingInsertMediaMenu, Icons } from "..";

export const ChatInput = () => {
	return (
		<div className="mx-5 mt-3 mb-1.5 max-md:mb-3 max-md:mx-3">
			<div className="bg-light-gray hover:ring-gray-300 focus-within:ring-gray-400 hover:focus-within:ring-gray-400 ring-1 ring-light-gray flex rounded-xl transition-all">
				<FloatingInsertMediaMenu />
				<input
					type="text"
					placeholder="Ask me anything"
					className="py-2 bg-transparent focus:outline-none flex-grow"
				/>
				<IconButton
					size="small"
					aria-label="send"
					edge="start"
					className="px-2 mx-0.5">
					<Icons.Send />
				</IconButton>
			</div>
		</div>
	);
};
