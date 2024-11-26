"use client";
import { Icons, NotificationModal, NotificationModalProps } from "@/components";
import { createContext, useContext, useEffect, useState } from "react";

type NotificationContent = Without<
	Without<NotificationModalProps, "open">,
	"onClose"
> & {
	onClose?: () => void;
};

interface NotificationContextType {
	showNotification: (notifData: NotificationContent) => void;
	finishLoading: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
	showNotification: () => {},
	finishLoading: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [notifData, setNotifData] = useState<NotificationContent>({
		description: "",
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const showNotification = (data: NotificationContent) => {
		setNotifData(data);
		if (data.isLoading) {
			return clearAndCloseModal;
		}
		return () => {};
	};

	useEffect(() => {
		if (notifData.description) {
			setIsOpen(true);
		}
	}, [notifData.description]);

	const clearAndCloseModal = () => {
		setIsOpen(false);
		setTimeout(() => {
			setNotifData({
				description: "",
			});
		}, 400);
	};

	const handleClose = () => {
		if (notifData.isLoading) {
			setIsLoading(true);
			notifData.onClose?.();
		} else {
			notifData.onClose?.();
			clearAndCloseModal();
		}
	};

	const finishLoading = () => {
		setIsLoading(false);
		clearAndCloseModal();
	};

	return (
		<NotificationContext.Provider value={{ showNotification, finishLoading }}>
			{children}
			<NotificationModal
				description={notifData.description}
				onClose={handleClose}
				open={isOpen}
				excerpt={notifData.excerpt}
				indicator={notifData.indicator}
				title={notifData.title}
				actionLabel={notifData.actionLabel}
				onOpen={notifData.onOpen}
				isLoading={isLoading}
			/>
		</NotificationContext.Provider>
	);
};

interface ErrorNotificationArgs {
	error: Error | null;
	notification: Without<NotificationContent, "description"> & {
		description?: string;
	};
}

export const getErrorNotificationProps = (error: { message: string }) => ({
	title: "An error occurred",
	description: "Something went wrong.",
	excerpt: error.message,
	indicator: <Icons.Warning className="text-red-500" />,
});

export const useErrorNotification = ({
	error,
	notification,
}: ErrorNotificationArgs) => {
	const { showNotification } = useNotification();
	useEffect(() => {
		if (error) {
			showNotification({
				...getErrorNotificationProps(error),
				...notification,
			});
		}
	}, [error]);
};

export const useNotification = () => useContext(NotificationContext);
