import { describe, it, expect } from "vitest";
import { getGummySizeOptionLabels } from "./gummy-size-display";

describe("getGummySizeOptionLabels", () => {
	it("maps 30 Gummies to Small size heading", () => {
		expect(getGummySizeOptionLabels("30 Gummies")).toEqual({
			primaryLabel: "Small size",
			secondaryLabel: "30 Gummies",
		});
	});

	it("maps 60 Gummies to Large size heading", () => {
		expect(getGummySizeOptionLabels("60 Gummies")).toEqual({
			primaryLabel: "Large size",
			secondaryLabel: "60 Gummies",
		});
	});

	it("maps SM and LG shorthand labels", () => {
		expect(getGummySizeOptionLabels("SM")).toEqual({
			primaryLabel: "Small size",
			secondaryLabel: "SM",
		});
		expect(getGummySizeOptionLabels("LG")).toEqual({
			primaryLabel: "Large size",
			secondaryLabel: "LG",
		});
	});
});
