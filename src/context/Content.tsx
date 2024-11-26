import { useContentData } from "@/api/content";
import React, { createContext, useContext, useEffect } from "react";
import { useErrorNotification } from "./Notification";
import { useAuth } from "./Auth";
import { FullScreenLoading } from "@/components";
import { useCheckUnauthorized } from "@/utils/useCheckUnauthorized";

const initialData = {
	isLoading: true,
	content: {
		logo_name: "",
		logo_url: "",
		user_pic: "",
		recent_chats: [],
		plan: "",
		credits: "",
		upgrade_btn: "",
		version: "",
		tool_buttons: [],
		main_buttons: {
			btn1: {
				name: "",
				link: "",
				icon: "",
			},
			btn2: {
				name: "",
				link: "",
				icon: "",
			},
		},
	},
};

const ContentContext = createContext<{
	content: ContentContextType;
	isLoading: boolean;
}>(initialData);

export interface ContentContextType {
	logo_name: string;
	logo_url: string;
	user_pic: string;
	recent_chats: Array<{
		title: string;
		t: number;
	}>;
	plan: string;
	credits: string;
	upgrade_btn: string;
	version: string;
	tool_buttons: Array<{
		name: string;
		link: string;
		icon: string;
	}>;
	main_buttons: {
		btn1: {
			name: string;
			link: string;
			icon: string;
		};
		btn2: {
			name: string;
			link: string;
			icon: string;
		};
	};
}

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { logout } = useAuth();
	const { data, error } = useContentData();
	const { notifyUnauthorized } = useCheckUnauthorized();

	useErrorNotification({
		error,
		notification: {
			description:
				"Something went wrong while trying to fetch the main page's content.",
			actionLabel: "Back to login",
			onClose: logout,
		},
	});

	useEffect(() => {
		if (data?.auth === false) {
			notifyUnauthorized(data.auth_error);
		}
	}, [data]);

	if (data?.auth === false) {
		return <FullScreenLoading />;
	}

	const contentData = data ? { content: data, isLoading: false } : initialData;

	return (
		<ContentContext.Provider value={contentData}>
			{children}
		</ContentContext.Provider>
	);
};

export const useContent = () => useContext(ContentContext);
