"use client";
import { useContent } from "@/context/Content";
import { Button } from "@mui/material";

export const UserPlan = () => {
	const { content } = useContent();
	return (
		<div className="rounded-xl border-tertiary/20 border p-2 pl-4 flex gap-3 items-center bg-white">
			<img
				src={content.logo_url}
				alt="symbol-logo"
				className="size-6 scale-150"
			/>
			<div className="flex flex-col">
				<span className="font-semibold">{content.plan}</span>
				<span className="text-xs text-dark-secondary -mt-1">
					{content.credits}
				</span>
			</div>
			<Button
				aria-label="upgrade"
				className="text-white normal-case font-urbanist bg-tertiary ml-auto">
				{content.upgrade_btn}
			</Button>
		</div>
	);
};
