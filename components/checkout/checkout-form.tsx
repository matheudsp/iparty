"use client";

import React, { useState } from "react";
import type Stripe from "stripe";

import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import * as config from "@/config/stripe.config";
import { createCheckoutSession } from "@/actions/stripe";
import getStripe from "@/utils/get-stripe";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
  paymentValue: number; 
}

export default function CheckoutForm({
  uiMode,
  paymentValue,
}: CheckoutFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const formAction = async (data: FormData): Promise<void> => {
    try {
      setLoading(true);

      // Inclui o valor fixo no FormData
      data.set("customDonation", paymentValue.toString());

      const { client_secret, url } = await createCheckoutSession(data);

      if (uiMode === "embedded") {
        setClientSecret(client_secret);
      } else {
        window.location.assign(url as string);
      }
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={uiMode} />
        <button
          className="checkout-style-background"
          type="submit"
          disabled={loading}
        >
          Pagar {formatAmountForDisplay(paymentValue, config.CURRENCY)}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}
