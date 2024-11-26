import { sendMessage } from "@/api/chat";
import { useAuth } from "@/context/Auth";
import { useMessages } from "@/context/Messages";
import { useErrorNotification } from "@/context/Notification";
import { useMutation } from "@tanstack/react-query";
import { useCheckUnauthorized } from "./useCheckUnauthorized";

export const useSendMessage = () => {
	const { setMessages } = useMessages();
	const { authData, isAuth } = useAuth();
	const { notifyUnauthorized } = useCheckUnauthorized();

	const { mutate, isPending, isSuccess, data, error } = useMutation({
		mutationFn: sendMessage,
		onSuccess: (data) => {
			if (data.auth === false) {
				notifyUnauthorized(data.auth_error);
				setMessages((prev) => prev.slice(0, -1));
				return;
			}
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

	useErrorNotification({
		error,
		notification: {
			description: "Something went wrong when trying to send a chat message.",
			onOpen: () => {
				setMessages((prev) => prev.slice(0, -1));
			},
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
