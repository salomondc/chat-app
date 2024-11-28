"use client";
import {
	ChatContainer,
	ChatHistoryContainer,
	ChatUserHeader,
	Icons,
} from "@/components";
import { useContent } from "@/context/Content";
import {
	getErrorNotificationProps,
	useNotification,
} from "@/context/Notification";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { kebabCase } from "change-case";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const getSite = async (siteUrl: string) => {
	const response = await axios.get<string>("/api/" + siteUrl);

	return response.data;
};

export default function SavedChat() {
	const { slug } = useParams() as { slug: string };
	const { isLoading, content } = useContent();
	const [site, setSite] = useState("");
	const { showNotification } = useNotification();
	const { mutate, isPending: siteIsLoading } = useMutation({
		mutationFn: getSite,
		onSuccess: (data) => {
			setSite(data);
		},
		onError: (err) => {
			showNotification({
				...getErrorNotificationProps({
					message: err.message,
				}),
			});
		},
	});

	type BtnKey = keyof typeof content.main_buttons;
	const selectedButtonName = Object.keys(content.main_buttons).find(
		(x) => kebabCase(content.main_buttons[x as BtnKey].name) == slug
	);

	useEffect(() => {
		if (!isLoading) {
			const siteUrl = content.main_buttons[
				selectedButtonName as BtnKey
			].link.replace("https://make.lumnar.tech/", "");
			mutate(siteUrl);
		}
	}, [isLoading]);

	return (
		<>
			{isLoading ? (
				<div className="h-screen w-screen flex items-center justify-center gap-2 flex-col">
					<Icons.Loading />
				</div>
			) : (
				<>
					<ChatHistoryContainer />
					<div className="flex flex-grow">
						<ChatContainer>
							<ChatUserHeader />
							{siteIsLoading ? (
								<div className="h-full flex items-center justify-center">
									<Icons.Loading />
								</div>
							) : (
								<div
									className="overflow-hidden h-full rounded-xl flex items-center justify-center"
									dangerouslySetInnerHTML={{ __html: site }}
								/>
							)}
						</ChatContainer>
					</div>
				</>
			)}
		</>
	);
}
