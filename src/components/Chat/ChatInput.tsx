"use client";
import { IconButton } from "@mui/material";
import { FloatingInsertMediaMenu, Icons } from "..";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useMessages } from "@/context/Messages";
import { sendMessage } from "@/api/chat";
import { useMutation } from "@tanstack/react-query";

interface Props {
	disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({ disabled }) => {
	const [value, setValue] = useState("");
	const { messages, setMessages } = useMessages();
	const mutateSendMessage = useMutation({
		mutationFn: sendMessage,
		onSuccess: (data) => {
			setMessages((prev) => {
				const newArr = [...prev];
				const last = newArr.length - 1;
				newArr[last].agent_status = data.agent_status;
				return [
					...newArr,
					{
						agent_message: ".",
					},
				];
			});
		},
	});

	const isLoading =
		messages[messages.length - 1] &&
		!messages[messages.length - 1]?.agent_status;

	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (!value) return;
		setValue("");
		inputRef.current?.blur();
		setMessages((prev) => [
			...prev,
			{
				user_message: value,
			},
		]);
		mutateSendMessage.mutate(value);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const listenForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<div className="mx-5 mt-3 mb-1.5 max-md:mb-3 max-md:mx-3">
			<div className="bg-light-gray hover:ring-gray-300 focus-within:ring-gray-400 hover:focus-within:ring-gray-400 ring-1 ring-light-gray flex rounded-xl transition-all">
				<FloatingInsertMediaMenu disabled={isLoading} />
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
				<IconButton
					size="small"
					onClick={handleSubmit}
					aria-label="send"
					edge="start"
					className="px-2 max-md:px-4 mx-0.5">
					<Icons.Send />
				</IconButton>
			</div>
		</div>
	);
};
