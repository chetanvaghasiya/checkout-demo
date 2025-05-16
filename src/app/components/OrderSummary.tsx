export function OrderSummary({
    subtotal,
    tax,
    total,
}: {
    subtotal: number;
    tax: number;
    total: number;
}) {
    return (
        <div className="bg-blue-50 p-5 rounded-lg shadow-md space-y-2">
            <h3 className="text-xl font-semibold text-blue-700">
                Order Summary
            </h3>
            <div className="text-sm space-y-1">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
