import { ChatMessages } from "@/components";

export default async function SavedChat({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;

	return <ChatMessages slug={slug} />;
}
