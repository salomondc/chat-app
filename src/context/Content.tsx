import { useContentData } from "@/api/content";
import React, { createContext, useContext } from "react";

const initialData = {
	isLoading: true,
	content: {
		logo_name: "",
		logo_url: "",
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
	const { data } = useContentData();

	const contentData = data ? { content: data, isLoading: false } : initialData;

	return (
		<ContentContext.Provider value={contentData}>
			{children}
		</ContentContext.Provider>
	);
};

export const useContent = () => useContext(ContentContext);
