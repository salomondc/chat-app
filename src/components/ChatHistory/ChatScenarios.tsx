"use client";
import Link from "next/link";
import { useMenu } from "@/context/Menu";
import { useMobileCheck } from "@/utils/useMobileCheck";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContent } from "@/context/Content";
import { Icons } from "..";

export const ChatScenarios: React.FC<{ slug?: string }> = ({ slug }) => {
	const { content } = useContent();
	const { setIsOpen } = useMenu();
	const { isMobile } = useMobileCheck();
	const router = useRouter();

	const waitForAnimationOnMobile = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		url: string
	) => {
		e.preventDefault();
		if (isMobile) {
			setIsOpen(false);
			setTimeout(() => {
				router.push(url);
			}, 500);
		} else {
			router.push(url);
		}
	};

	// Scroll to currently selected chat
	useEffect(() => {
		if (slug) {
			document
				.getElementById(`chat-${slug}`)
				?.scrollIntoView({ block: "center" });
		}
	}, [slug]);

	return (
		<>
			<div className="flex items-center">
				<span className="text-lg font-medium">Scenarios</span>
				<Icons.ArrorRight className="ml-auto" />
			</div>
			<div className="flex flex-col gap-4">
				{content.tool_buttons.map((item, i) => {
					return (
						<Link
							href={item.link}
							id={`scnr-${item.link}-${i}`}
							key={`scnr-${item.link}-${i}`}
							onClick={(e) => waitForAnimationOnMobile(e, item.link)}
							className={`text-dark-secondary cursor-pointer hover:text-foreground mr-auto`}>
							{item.name}
						</Link>
					);
				})}
			</div>
		</>
	);
};
