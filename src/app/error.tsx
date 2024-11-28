"use client";

import { FullScreenLoading } from "@/components";
import {
	getErrorNotificationProps,
	useNotification,
} from "@/context/Notification";
import { mapStackTrace } from "@/utils/mapStackTrace";
import { useEffect } from "react";

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const { showNotification } = useNotification();

	const showStackTrace = async () => {
		const mappedStack = await mapStackTrace(error.stack || "");

		showNotification({
			...getErrorNotificationProps(error),
			title: error.name,
			description: error.message,
			excerpt: mappedStack.join("\n"),
			onClose: () => {
				location.reload();
			},
			actionLabel: "Refresh",
		});
	};

	useEffect(() => {
		showStackTrace();
	}, [error]);

	return <FullScreenLoading />;
}
