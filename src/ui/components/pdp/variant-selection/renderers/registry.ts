"use client";

import type { RendererRegistry } from "../types";
import { ColorSwatchOption } from "./color-swatch-option";
import { ImageSwatchPillOption } from "./image-swatch-pill-option";
import { TextOption } from "./button-option";
import { SizeCardOption } from "./size-card-option";
import { BundleRadioOption } from "./bundle-radio-option";

/**
 * Default renderer registry.
 *
 * Special keys:
 * - `_imageSwatch`: Used when an option has a swatchImageUrl value
 * - `_color`: Used when an option has a colorHex value (regardless of attribute)
 * - `_default`: Fallback for any unmatched options
 *
 * Attribute slugs (like "size", "color") can also be used as keys.
 */
export const defaultRenderers: RendererRegistry = {
	_imageSwatch: ImageSwatchPillOption,
	_color: ColorSwatchOption,

	size: SizeCardOption,
	"shoe-size": SizeCardOption,
	"clothing-size": SizeCardOption,
	"gummy-size": SizeCardOption,

	bundle: BundleRadioOption,
	pack: BundleRadioOption,
	"pack-size": BundleRadioOption,

	color: TextOption,
	colour: TextOption,

	_default: TextOption,
};
