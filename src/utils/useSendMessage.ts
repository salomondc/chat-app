import { sendMessage } from "@/api/chat";
import { useAuth } from "@/context/Auth";
import { useMessages } from "@/context/Messages";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
	const { setMessages } = useMessages();
	const { authData, isAuth } = useAuth();

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

	const send = (text: string, images: string[] = [], agent?: string) => {
		if ((!text && !images.length) || !isAuth) return;
		setMessages((prev) => [
			...prev,
			{
				user_message: text,
				pictures: images,
				agent: agent || "task_dispatcher",
			},
		]);
		mutate({
			message: text || "Describe the image or images I sent.",
			pictures: images,
			agent,
			csrfToken: authData.csrf_token!,
			sessionId: authData.session_id!,
		});
	};

	return {
		send,
		isPending,
		isSuccess,
		data,
	};
};
