"use client";
import Image from "next/image";

export const ChatHeader = () => {
	return (
		<div className="border-b">
			<div className="flex items-center">
				<span className="text-xl font-semibold mx-5 my-4">Welcome back</span>
				<Image
					src={"/ocean-protocol.png"}
					height={44}
					width={44}
					alt="logo"
					className="ml-auto mr-5 "
				/>
			</div>
		</div>
	);
};
