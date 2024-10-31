import { Icons } from "@/components";
import { IconButton } from "@mui/material";

export const ChatResponse: React.FC<{ text: string; time: string }> = ({
	text,
	time,
}) => {
	return (
		<div className="mr-auto flex gap-2">
			<Icons.Logo className="shrink-0" />
			<div className="flex flex-col mr-auto gap-1">
				<div className="border px-3 py-2 rounded-xl max-w-3xl">{text}</div>
				<div className="flex items-center">
					<IconButton aria-label="copy">
						<Icons.Copy />
					</IconButton>
					<IconButton aria-label="speech">
						<Icons.Volume />
					</IconButton>
					<IconButton aria-label="refresh">
						<Icons.Refresh />
					</IconButton>
					<IconButton aria-label="like">
						<Icons.Like />
					</IconButton>
					<IconButton aria-label="dislike">
						<Icons.Dislike />
					</IconButton>
					<span className="mx-3 text-primary-100 hover:underline cursor-pointer active:opacity-50 select-none text-sm">
						See translation
					</span>
					<div className="ml-auto text-sm text-dark-secondary">{time}</div>
				</div>
			</div>
		</div>
	);
};
