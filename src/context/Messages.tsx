"use client";
import { AgentMessage } from "@/api/chat";
import { createContext, useContext, useState } from "react";

interface Message {
	agent_status?: string;
	user_message?: string;
	agent_message?: AgentMessage;
	pictures?: string[];
	agent?: string;
}

interface MessagesContextType {
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MessagesContext = createContext<MessagesContextType>({
	messages: [],
	setMessages: () => {},
});

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [messages, setMessages] = useState<Message[]>([]);

	return (
		<MessagesContext.Provider value={{ messages, setMessages }}>
			{children}
		</MessagesContext.Provider>
	);
};

export const useMessages = () => useContext(MessagesContext);
