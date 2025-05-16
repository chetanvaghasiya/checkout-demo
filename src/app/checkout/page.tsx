"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types";
import { ProductItem } from "../components/ProductItem";
import { OrderSummary } from "../components/OrderSummary";
import { PaymentForm } from "../components/PaymentForm";

export default function CheckoutPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("/api/products");
                const data = res.data;
                setProducts(data);
                const initialQuantities: { [id: number]: number } = {};
                data.forEach((p: Product) => (initialQuantities[p.id] = 1));
                setQuantities(initialQuantities);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleQuantityChange = (id: number, qty: number) => {
        setQuantities((prev) => ({ ...prev, [id]: qty }));
    };

    const subtotal = products.reduce(
        (sum, p) => sum + (quantities[p.id] || 0) * p.price,
        0
    );

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-10">
            <h1 className="text-4xl font-bold text-center text-blue-700">
                Checkout
            </h1>

            <div className="space-y-6">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        quantity={quantities[product.id] || 1}
                        onQuantityChange={handleQuantityChange}
                    />
                ))}
            </div>

            <OrderSummary subtotal={subtotal} tax={tax} total={total} />
            <PaymentForm amount={total} />
        </div>
    );
}
