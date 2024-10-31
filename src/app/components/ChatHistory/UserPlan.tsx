"use client";
import { Button } from "@mui/material";
import Image from "next/image";

export const UserPlan = () => {
	return (
		<div className="rounded-xl border-tertiary/20 border p-2 pl-4 flex gap-3 items-center bg-white">
			<Image
				src={"/ocean-protocol.png"}
				width={24}
				height={24}
				alt="symbol-logo"
			/>
			<div className="flex flex-col">
				<span className="font-semibold">Basic Plan</span>
				<span className="text-xs text-dark-secondary -mt-1">
					20/20 left credit
				</span>
			</div>
			<Button
				aria-label="upgrade"
				className="text-white normal-case font-urbanist bg-tertiary ml-auto">
				Upgrade
			</Button>
		</div>
	);
};
