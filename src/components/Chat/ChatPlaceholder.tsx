"use client";
import { Icons } from "..";

export const ChatPlaceholder = () => {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-2">
			<Icons.ViewFinder />
			<span className="text-gray-400 text-lg mx-8 text-center">
				Select a scenario on the menu to get started.
			</span>
		</div>
	);
};
