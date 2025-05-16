"use client";

import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import toast from "react-hot-toast";
import { tokenizeCard } from "../lib/tokenizeCard";

const schema = z.object({
    cardNumber: z.string().length(16),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/),
    cvv: z.string().length(3),
    name: z.string().min(3),
});

export function PaymentForm({ amount }: { amount: number }) {
    const [form, setForm] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            schema.parse(form);
            const token = await tokenizeCard(
                form.cardNumber,
                form.expiry,
                form.cvv,
                form.name
            );
            console.log("Token:", token);

            const res = await axios.post("/api/checkout", { token });
            toast.success(res.data.message);
            setForm({
                cardNumber: "",
                expiry: "",
                cvv: "",
                name: "",
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            toast.error(
                e.errors ? e.errors[0].message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-blue-700">
                Payment Details
            </h3>
            <input
                name="cardNumber"
                placeholder="Card Number"
                maxLength={16}
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.cardNumber}
                onChange={handleChange}
            />
            <div className="flex gap-3">
                <input
                    name="expiry"
                    placeholder="MM/YY"
                    className="w-1/2 border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.expiry}
                    onChange={handleChange}
                />
                <input
                    name="cvv"
                    placeholder="CVV"
                    maxLength={3}
                    className="w-1/2 border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.cvv}
                    onChange={handleChange}
                />
            </div>
            <input
                name="name"
                placeholder="Cardholder Name"
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={handleChange}
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 w-full"
            >
                {loading ? "Paying..." : `Pay ${amount.toFixed(2)}`}
            </button>
        </div>
    );
}
