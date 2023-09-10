import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { supabase } from "../../../lib/supabaseClient";
import { stripe } from "../../../lib/stripe";
import { metadata } from "../../layout";
import { Resend } from "resend";
import { ReceiptMail } from "../../../emails/receiptMail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const firstName = session?.customer_details?.name;
    const email = session?.customer_details?.email;
    const address = addressString;
    const products = session?.metadata?.products;

    //send comfirmation email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Bestelling geslaagd!",
      react: ReceiptMail({
        name: firstName,
        address: address,
        products: products,
      }),
    });

    const order = await supabase
      .from("orders")
      .update([
        {
          status: "true",
          address: addressString,
          email: session?.customer_details?.email,
          naam: session?.customer_details?.name,
        },
      ])
      .eq("order_id", session?.metadata?.orderId);

    //send email with conformation and order details
    //make call to api/send route
  }

  if (event.type === "checkout.session.failed") {
    const order = await supabase
      .from("orders")
      .update([
        {
          status: "failed",
          address: addressString,
          email: session?.customer_details?.email,
          naam: session?.customer_details?.name,
        },
      ])
      .eq("order_id", session?.metadata?.orderId);
    console.log(order);
  }

  return new NextResponse(null, { status: 200 });
}
