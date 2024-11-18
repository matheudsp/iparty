import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";

import { type NextRequest } from "next/server";

import { currentUser } from "@/lib/auth";
import { addParticipantToParty } from "@/services/party";
import { toast } from "sonner";

export const GET = async (req: NextRequest) => {
    const user = await currentUser()
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id") as string;
    let slug
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        // console.log(session);

        slug = session.metadata?.slug;
        const isPaid = true
        if (session.status === "complete") {
            await addParticipantToParty(user?.id!, slug!, isPaid)
        }
    } catch (err) {
        console.log(err);
        return Response.json(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
    redirect(`/party/${slug}`);
    
};