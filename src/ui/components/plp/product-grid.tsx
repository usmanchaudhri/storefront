import { ProductCard, type ProductCardData } from "./product-card";
import { cn } from "@/lib/utils";

export type ProductGridDesktopColumns = 3 | 4;

export const productGridDesktopClassName: Record<ProductGridDesktopColumns, string> = {
	3: "lg:grid-cols-3",
	4: "lg:grid-cols-4",
};

interface ProductGridProps {
	products: ProductCardData[];
	desktopColumns?: ProductGridDesktopColumns;
	imageSizes?: string;
}

export function ProductGrid({ products, desktopColumns = 3, imageSizes }: ProductGridProps) {
	return (
		<div
			className={cn("grid w-full grid-cols-2 gap-4 lg:gap-6", productGridDesktopClassName[desktopColumns])}
			data-testid="ProductList"
		>
			{products.map((product, index) => (
				<ProductCard key={product.id} product={product} priority={index < 3} imageSizes={imageSizes} />
			))}
		</div>
	);
}
