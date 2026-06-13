/**
 * Display labels for gummy-size variant options.
 * Maps Saleor values like "30 Gummies" / "60 Gummies" to a size heading + count line.
 */
export function getGummySizeOptionLabels(optionName: string): {
	primaryLabel: string;
	secondaryLabel: string;
} | null {
	const gummyCountMatch = optionName.match(/(\d+)\s*gumm/i);
	const gummyCount = gummyCountMatch ? Number.parseInt(gummyCountMatch[1]!, 10) : null;

	if (gummyCount === 30) {
		return { primaryLabel: "Small size", secondaryLabel: optionName };
	}
	if (gummyCount === 60) {
		return { primaryLabel: "Large size", secondaryLabel: optionName };
	}

	const normalized = optionName.trim().toUpperCase();
	if (normalized === "SM" || normalized === "SMALL") {
		return { primaryLabel: "Small size", secondaryLabel: optionName };
	}
	if (normalized === "LG" || normalized === "LARGE") {
		return { primaryLabel: "Large size", secondaryLabel: optionName };
	}

	return null;
}
