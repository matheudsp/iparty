import type { Metadata } from "next";

import CheckoutForm from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
    title: "Donate with hosted Checkout | Next.js + TypeScript Example",
};

export default function DonatePage(): JSX.Element {
    const paymentValue = 100
    return (
        <div className="page-container">
            <h1>Donate with hosted Checkout</h1>
            <p>Donate to our project 💖</p>
            <CheckoutForm uiMode="hosted" paymentValue={paymentValue} />
        </div>
    );
}