import edjsHTML from "editorjs-html";
import xss from "xss";

const parser = edjsHTML();

export function parseEditorJsContent(content: string | null | undefined): string[] | null {
	if (!content) {
		return null;
	}

	try {
		const parsed = parser.parse(JSON.parse(content));
		return parsed.map((block) => xss(block));
	} catch {
		return null;
	}
}
