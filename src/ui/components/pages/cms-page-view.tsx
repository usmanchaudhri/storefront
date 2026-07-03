import { parseEditorJsContent } from "@/lib/pages/parse-editorjs-content";

type CmsPageViewProps = {
	title: string;
	content: string | null | undefined;
};

export function CmsPageView({ title, content }: CmsPageViewProps) {
	const contentHtml = parseEditorJsContent(content);

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="text-3xl font-semibold">{title}</h1>
			{contentHtml && (
				<div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
					{contentHtml.map((block) => (
						<div key={block} dangerouslySetInnerHTML={{ __html: block }} />
					))}
				</div>
			)}
		</div>
	);
}
