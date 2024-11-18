import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
    const requestHeaders = new Headers(req.headers);
    const origin = requestHeaders.get("origin");

    const { slug } = await req.json();

    const party = await db.party.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!party) {
        return Response.json(null, {
            status: 404,
            statusText: "Party Not Found",
        });
    }


    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            metadata: { slug },
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: `iParty | ${party.name}`
                        },
                        unit_amount: Math.round((parseFloat(party.valueForEachParticipant!) + (parseFloat(party.valueForEachParticipant!) * 0.07)) * 100)
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",

            return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
        });

        return Response.json({ clientSecret: session.client_secret });
    } catch (error) {
        console.log(error);

        return Response.json(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
};