import { Suspense } from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import edjsHTML from "editorjs-html";
import xss from "xss";
import { PageGetBySlugDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";

const parser = edjsHTML();

type PageProps = {
	params: Promise<{ slug: string; channel: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
	const params = await props.params;
	const result = await executePublicGraphQL(PageGetBySlugDocument, {
		variables: { slug: params.slug },
		revalidate: 60,
	});

	const page = result.ok ? result.data.page : null;

	return {
		title: `${page?.seoTitle || page?.title || "Page"} · Saleor Storefront example`,
		description: page?.seoDescription || page?.seoTitle || page?.title,
	};
};

export default function Page(props: PageProps) {
	return (
		<Suspense fallback={<PageSkeleton />}>
			<CmsPageContent params={props.params} />
		</Suspense>
	);
}

async function CmsPageContent({ params: paramsPromise }: { params: PageProps["params"] }) {
	const params = await paramsPromise;
	const result = await executePublicGraphQL(PageGetBySlugDocument, {
		variables: { slug: params.slug },
		revalidate: 60,
	});

	if (!result.ok || !result.data.page) {
		notFound();
	}

	const page = result.data.page;
	const { title, content } = page;
	const contentHtml = content ? parser.parse(JSON.parse(content)) : null;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="text-3xl font-semibold">{title}</h1>
			{contentHtml && (
				<div className="prose">
					{contentHtml.map((content) => (
						<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
					))}
				</div>
			)}
		</div>
	);
}

function PageSkeleton() {
	return (
		<div className="mx-auto max-w-7xl animate-pulse p-8 pb-16">
			<div className="h-9 w-64 rounded bg-muted" />
			<div className="mt-8 space-y-3">
				<div className="h-4 w-full rounded bg-muted" />
				<div className="h-4 w-full rounded bg-muted" />
				<div className="h-4 w-3/4 rounded bg-muted" />
			</div>
		</div>
	);
}
