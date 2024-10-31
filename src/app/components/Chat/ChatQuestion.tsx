export const ChatQuestion: React.FC<{ text: string; time: string }> = ({
	text,
	time,
}) => {
	return (
		<div className="flex flex-col ml-auto gap-1">
			<div className="bg-gray-100 px-3 py-2 rounded-xl max-w-3xl">{text}</div>
			<div className="ml-auto text-sm text-dark-secondary">{time}</div>
		</div>
	);
};
