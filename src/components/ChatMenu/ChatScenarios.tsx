"use client";
import Link from "next/link";
import { useMenu } from "@/context/Menu";
import { useMobileCheck } from "@/utils/useMobileCheck";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContent } from "@/context/Content";
import { Icons } from "..";
import { Button } from "@mui/material";
import { kebabCase } from "change-case";

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
			</div>
			<div>
				{content.tool_buttons.map((item, i) => {
					return (
						<div
							key={`scnr-${item.link}-${i}`}
							className="group">
							<Link
								id={`scnr-${item.link}-${i}`}
								href={`/chat/${kebabCase(item.name)}`}
								onClick={(e) =>
									waitForAnimationOnMobile(e, `/chat/${kebabCase(item.name)}`)
								}>
								<Button
									fullWidth
									aria-label="preferences"
									className="bg-white hover:bg-light-gray text-foreground normal-case font-urbanist text-base flex justify-start gap-2 group-first:rounded-t-xl rounded-t-none rounded-b-none group-last:rounded-b-xl p-3 ">
									<img
										src={item.icon || ""}
										alt="btn1-icon"
										className="size-6"
									/>
									{item.name}
									<Icons.ArrorRight className="ml-auto" />
								</Button>
							</Link>
							<div className="border-t mx-3 group-last:hidden" />
						</div>
					);
				})}
			</div>
		</>
	);
};
