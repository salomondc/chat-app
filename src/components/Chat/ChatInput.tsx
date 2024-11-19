"use client";
import { IconButton } from "@mui/material";
import { FloatingInsertMediaMenu, Icons } from "..";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useMessages } from "@/context/Messages";
import { useSendMessage } from "@/utils/useSendMessage";

interface Props {
	disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({ disabled }) => {
	const [value, setValue] = useState("");
	const { messages } = useMessages();
	const [files, setFiles] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);
	const { send } = useSendMessage();

	const isLoading =
		messages[messages.length - 1] &&
		!messages[messages.length - 1]?.agent_status;

	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		send(value, previewImages);
		setValue("");
		setPreviewImages([]);
		inputRef.current?.blur();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const listenForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFiles([...e.target.files]);
			e.target.value = "";
		}
	};

	useEffect(() => {
		if (files) {
			[...files].forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					const base64img = reader.result?.toString();
					if (base64img && !previewImages.includes(base64img)) {
						setPreviewImages((prev) => [...prev, base64img]);
					}
				};
				reader.readAsDataURL(file);
			});
		}
	}, [files]);

	return (
		<div className="mx-5 mt-3 mb-1.5 max-md:mb-3 max-md:mx-3">
			<div className="bg-light-gray hover:ring-gray-300 focus-within:ring-gray-400 hover:focus-within:ring-gray-400 ring-1 ring-light-gray flex items-end rounded-xl transition-all">
				<FloatingInsertMediaMenu
					disabled={isLoading || disabled}
					handleFileChange={handleFileChange}
				/>
				<div className="flex flex-col flex-grow">
					<div
						className={`flex flex-wrap gap-4 ${
							previewImages.length ? "" : "hidden"
						}`}>
						{previewImages.map((base64img, i) => (
							<div
								key={`atchmnt-${i}`}
								className="mt-4 relative max-sm:bg-white max-sm:p-1 max-sm:pr-0 rounded-xl flex justify-center items-center">
								<img
									className="h-12 w-12 object-cover rounded-xl shrink-0"
									src={base64img}
									alt="attachment"
								/>
								<IconButton
									onClick={() => {
										setPreviewImages((prev) => {
											const newArr = [...prev];
											newArr.splice(i, 1);
											return newArr;
										});
									}}
									aria-label="delete-photo"
									className="size-10 sm:absolute sm:m-auto sm:bg-white/30 sm:opacity-0 sm:hover:opacity-100 sm:transition-opacity ">
									<Icons.Close />
								</IconButton>
							</div>
						))}
					</div>

					<input
						ref={inputRef}
						type="text"
						value={value}
						disabled={isLoading || disabled}
						onFocus={(e) => {
							e.target.scrollIntoView();
						}}
						onKeyDown={listenForEnter}
						onChange={handleChange}
						placeholder="Ask me anything"
						className="py-2 max-md:py-4 bg-transparent focus:outline-none flex-grow"
					/>
				</div>
				<IconButton
					size="small"
					onClick={handleSubmit}
					aria-label="send"
					edge="start"
					className="p-2 max-md:p-4 mx-0.5">
					<Icons.Send />
				</IconButton>
			</div>
		</div>
	);
};
