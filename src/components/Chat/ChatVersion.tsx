"use client";

import { useContent } from "@/context/Content";

export const ChatVersion = () => {
	const { content } = useContent();
	return (
		<div className="mx-auto mb-1.5 text-xs text-dark-secondary max-md:hidden">
			{content.version}
		</div>
	);
};
