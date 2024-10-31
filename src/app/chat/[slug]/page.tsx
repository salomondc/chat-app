import {
	ChatHistoryContainer,
	ChatContainer,
	ChatUserHeader,
	ChatInput,
	ChatVersion,
	ChatMessages,
} from "@/components";
import { MenuProvider } from "@/context/Menu";

export default async function SavedChat({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;

	return (
		<div className="flex min-h-[100dvh]">
			<MenuProvider>
				<ChatHistoryContainer slug={slug} />
				<div className="flex flex-grow">
					<ChatContainer>
						<ChatUserHeader />
						<div className="flex flex-grow">
							<ChatMessages slug={slug} />
						</div>
						<div className="border-t md:hidden" />
						<ChatInput />
						<ChatVersion />
					</ChatContainer>
				</div>
			</MenuProvider>
		</div>
	);
}
