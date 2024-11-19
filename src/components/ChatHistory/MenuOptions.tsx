"use client";
import { Icons } from "@/components";
import { useContent } from "@/context/Content";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const MenuOptions = () => {
	const {
		content: {
			main_buttons: { btn1, btn2 },
		},
	} = useContent();
	const router = useRouter();

	return (
		<div className="bg-white rounded-xl">
			<Button
				onClick={() => {
					router.push(btn1.link);
				}}
				fullWidth
				aria-label="preferences"
				className="bg-white hover:bg-light-gray text-foreground normal-case font-urbanist text-base flex justify-start gap-2 rounded-t-xl rounded-b-none p-3">
				<img
					src={btn1.icon}
					alt="btn1-icon"
					className="size-6"
				/>
				{btn1.name}
				<Icons.ArrorRight className="ml-auto" />
			</Button>
			<div className="border-t mx-3" />
			<Button
				onClick={() => {
					router.push(btn2.link);
				}}
				fullWidth
				aria-label="help"
				className="bg-white hover:bg-light-gray text-foreground normal-case font-urbanist text-base flex justify-start gap-2 rounded-b-xl rounded-t-none p-3">
				<img
					src={btn2.icon}
					alt="btn2-icon"
					className="size-6"
				/>
				{btn2.name}
				<Icons.ArrorRight className="ml-auto" />
			</Button>
		</div>
	);
};
