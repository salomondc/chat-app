import { sendMessage } from "@/api/chat";
import { useMessages } from "@/context/Messages";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
	const { setMessages } = useMessages();
	const { mutate, isPending, isSuccess, data } = useMutation({
		mutationFn: sendMessage,
		onSuccess: (data) => {
			setMessages((prev) => {
				const newArr = [...prev];
				const last = newArr.length - 1;
				newArr[last].agent_status = data.agent_status;
				return [
					...newArr,
					{
						agent_message: {
							message: ".",
							options: [],
						},
					},
				];
			});
		},
	});

	const send = (text: string, images: string[] = []) => {
		if (!text && !images.length) return;
		setMessages((prev) => [
			...prev,
			{
				user_message: text,
				pictures: images,
			},
		]);
		mutate({
			message: text,
			pictures: images,
		});
	};

	return {
		send,
		isPending,
		isSuccess,
		data,
	};
};
