import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json();

    if (!data.token) {
        return NextResponse.json(
            { success: false, message: "Missing token" },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Payment processed successfully",
    });
}
