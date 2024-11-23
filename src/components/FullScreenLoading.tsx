import { Icons } from ".";

export const FullScreenLoading = () => {
	return (
		<div className="h-[100dvh] w-screen flex items-center justify-center gap-2 flex-col">
			<Icons.Loading />
		</div>
	);
};
