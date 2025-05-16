import { NextResponse } from "next/server";

export async function GET() {
    const products = [
        { id: 1, name: "Pro Subscription", price: 20 },
        { id: 2, name: "Enterprise Plan", price: 50 },
        { id: 3, name: "Add-on Module", price: 10 },
    ];
    return NextResponse.json(products);
}
