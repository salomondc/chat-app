"use client";
import Image from "next/image";

export const ChatPlaceholder = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Image
				src="/ocean-protocol.png"
				width={108}
				height={108}
				alt="logo-symbol"
			/>
		</div>
	);
};
