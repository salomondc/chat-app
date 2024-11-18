import { Icons } from "..";

interface ChatQuestionProps {
	text: string;
	time: string;
	images: string[];
	pending?: boolean;
}

export const ChatQuestion: React.FC<ChatQuestionProps> = ({
	text,
	time,
	pending,
	images,
}) => {
	return (
		<div className={`flex flex-col ml-auto gap-1 items-end`}>
			{images.map((base64img, i) => (
				<img
					key={text + i + "img"}
					src={base64img}
					alt="user-message-img"
					className="w-[300px] max-h-[500px] object-cover rounded-xl"
				/>
			))}
			<div className={`relative ${!text ? "hidden" : ""}`}>
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
