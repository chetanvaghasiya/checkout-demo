export async function tokenizeCard(
    cardNumber: string,
    expiry: string,
    cvv: string,
    name: string
): Promise<string> {
    const encoder = new TextEncoder();
    const data = `${cardNumber}|${expiry}|${cvv}|${name}`;
    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        encoder.encode(data)
    );
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
