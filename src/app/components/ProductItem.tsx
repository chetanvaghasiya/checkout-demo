import { Product } from "../types";

export function ProductItem({
    product,
    quantity,
    onQuantityChange,
}: {
    product: Product;
    quantity: number;
    onQuantityChange: (id: number, qty: number) => void;
}) {
    return (
        <div className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg">
            <div>
                <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                </h2>
                <p className="text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <input
                    type="number"
                    min={1}
                    className="w-16 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={quantity}
                    onChange={(e) =>
                        onQuantityChange(product.id, parseInt(e.target.value))
                    }
                />
                <span className="text-gray-700 font-medium">
                    ${(quantity * product.price).toFixed(2)}
                </span>
            </div>
        </div>
    );
}
