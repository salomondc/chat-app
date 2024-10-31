"use client";
import Link from "next/link";
import { chatHistoryData } from "./chatHistoryData";
import { useMenu } from "@/context/Menu";
import { useMobileCheck } from "@/utils/useMobileCheck";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ChatHistory: React.FC<{ slug?: string }> = ({ slug }) => {
	const { setIsOpen } = useMenu();
	const { isMobile } = useMobileCheck();
	const router = useRouter();

	const slideToChat = (
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

	useEffect(() => {
		if (slug) {
			document
				.getElementById(`chat-${slug}`)
				?.scrollIntoView({ block: "center" });
		}
	}, []);

	return (
		<div className="flex-grow flex flex-col gap-4 overflow-auto ">
			{chatHistoryData.map((itemGroup) => (
				<div
					key={itemGroup.title}
					className="flex flex-col gap-2">
					<span className="font-medium">{itemGroup.title}</span>
					{itemGroup.items.map((item) => {
						const isSelected = slug == item.id.toString();
						return (
							<Link
								href={`/chat/${item.id}`}
								id={`chat-${item.id.toString()}`}
								key={item.id}
								onClick={(e) => slideToChat(e, `/chat/${item.id}`)}
								className={`${
									isSelected ? "" : "text-dark-secondary"
								} cursor-pointer hover:text-foreground mr-auto`}>
								{isSelected ? (
									<span className="font-sans -translate-y-[1px] inline-flex mr-2">
										•{" "}
									</span>
								) : (
									""
								)}
								{item.label}
							</Link>
						);
					})}
				</div>
			))}
		</div>
	);
};
