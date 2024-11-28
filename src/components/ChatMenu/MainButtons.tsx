"use client";
import { Icons } from "@/components";
import { useContent } from "@/context/Content";
import { useMenu } from "@/context/Menu";
import { useMobileCheck } from "@/utils/useMobileCheck";
import { Button } from "@mui/material";
import { kebabCase } from "change-case";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const MenuOptions = () => {
	const {
		content: { main_buttons },
	} = useContent();
	type BtnKey = keyof typeof main_buttons;

	const { setIsOpen } = useMenu();
	const router = useRouter();
	const { isMobile } = useMobileCheck();

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

	return (
		<div>
			{Object.keys(main_buttons).map((btnKey, i) => {
				const item = main_buttons[btnKey as BtnKey];

				return (
					<div
						key={`scnr-${item.link}-${i}`}
						className="group">
						<Link
							id={`scnr-${item.link}-${i}`}
							href={`/site/${kebabCase(item.name)}`}
							onClick={(e) =>
								waitForAnimationOnMobile(e, `/site/${kebabCase(item.name)}`)
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
	);
};
