import Stripe from "stripe";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { stripe } from "../../../lib/stripe";
import { supabase } from "../../../lib/supabaseClient";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { productIds, quantity, price } = await req.json();

  if (
    !productIds ||
    productIds.length === 0 ||
    !quantity ||
    quantity.length === 0 ||
    !price ||
    price.length === 0
  ) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .select()
    .in("id", productIds);

  if (error) {
    throw error;
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  data.forEach((product) => {
    line_items.push({
      quantity: quantity[product.id],
      price_data: {
        currency: "EUR",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100,
      },
    });
  });
  const uuid = uuidv4();
  const products_names = data.map((item) => item.title).join(", ");

  const order = await supabase.from("orders").insert([
    {
      order_id: uuid,
      products_names: products_names,
      isPaid: "false",
      isShipped: false,
      total_price: price,
    },
  ]);

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",

    success_url: `${process.env.NEXT_PUBLIC_URL}/betaald?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/betaald?canceled=1`,
    metadata: {
      orderId: uuid,
    },
    // shipping_address_collection: {
    //   allowed_countries: ["NL", "BE"],
    // },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
