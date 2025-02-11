"use client";
export const ChatContainer: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div
			className={`bg-white md:border md:ml-0 md:m-6 md:rounded-2xl flex-grow flex flex-col h-[calc(100dvh-3rem)] max-md:h-[100dvh]`}>
			{children}
		</div>
	);
};
