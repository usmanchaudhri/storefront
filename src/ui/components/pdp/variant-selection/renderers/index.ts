/**
 * Option Renderers for the Variant Selection System
 *
 * This module exports individual renderers and the default registry.
 *
 * ## Customization
 *
 * To use a custom renderer for a specific attribute:
 *
 * ```tsx
 * import { VariantSelectionSection, TextOption } from "@/ui/components/pdp/variant-selection";
 *
 * // Custom renderer for a specific attribute
 * function MyCustomColorRenderer({ option, isSelected, onSelect }) {
 *   return (
 *     <button onClick={() => onSelect(option.id)}>
 *       {option.name} - Custom!
 *     </button>
 *   );
 * }
 *
 * // Use it in the section
 * <VariantSelectionSection
 *   variants={variants}
 *   renderers={{
 *     color: MyCustomColorRenderer,
 *     _default: TextOption,
 *   }}
 * />
 * ```
 */

export { ColorSwatchOption } from "./color-swatch-option";
export { ImageSwatchPillOption } from "./image-swatch-pill-option";
export { ButtonOption, SizeButtonOption, TextOption, type ButtonOptionProps } from "./button-option";
export { SizeCardOption } from "./size-card-option";
export { BundleRadioOption } from "./bundle-radio-option";
export { defaultRenderers } from "./registry";
