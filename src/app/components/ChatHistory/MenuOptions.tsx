"use client";
import { Icons } from "@/components";
import { Button } from "@mui/material";

export const MenuOptions = () => {
	return (
		<div className="bg-white rounded-xl">
			<Button
				fullWidth
				aria-label="preferences"
				className="bg-white hover:bg-light-gray text-foreground normal-case font-urbanist text-base flex justify-start gap-2 rounded-t-xl rounded-b-none p-3">
				<Icons.Cog />
				Preferences
				<Icons.ArrorRight className="ml-auto" />
			</Button>
			<div className="border-t mx-3" />
			<Button
				fullWidth
				aria-label="help"
				className="bg-white hover:bg-light-gray text-foreground normal-case font-urbanist text-base flex justify-start gap-2 rounded-b-xl rounded-t-none p-3">
				<Icons.InfoCircle />
				Help & Support
				<Icons.ArrorRight className="ml-auto" />
			</Button>
		</div>
	);
};
