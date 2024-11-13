import { Icons } from "..";

interface ChatQuestionProps {
	text: string;
	time: string;
	pending?: boolean;
}

export const ChatQuestion: React.FC<ChatQuestionProps> = ({
	text,
	time,
	pending,
}) => {
	return (
		<div className={`flex flex-col ml-auto gap-1 `}>
			<div className="relative">
				<div
					className={`bg-gray-100 transition-opacity duration-500 px-3 py-2 rounded-xl max-w-3xl ${
						pending ? "opacity-30" : ""
					}`}>
					{text}
				</div>
				{pending ? (
					<Icons.Loading className=" absolute left-0 right-0 m-auto top-0 bottom-0" />
				) : null}
			</div>
			<div className="ml-auto text-sm text-dark-secondary">{time}</div>
		</div>
	);
};
