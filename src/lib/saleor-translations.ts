/**
 * Pick Saleor translation fields with fallback to the default (channel) language.
 */

type TranslationRecord = Record<string, string | null | undefined> | null | undefined;

export function pickTranslatedField(
	translation: TranslationRecord,
	field: string,
	fallback: string | null | undefined,
): string | null | undefined {
	const value = translation?.[field];
	if (typeof value === "string" && value.trim().length > 0) {
		return value;
	}
	return fallback;
}

export function pickTranslatedName(entity: {
	name: string;
	translation?: { name?: string | null } | null;
}): string {
	return pickTranslatedField(entity.translation, "name", entity.name) ?? entity.name;
}
