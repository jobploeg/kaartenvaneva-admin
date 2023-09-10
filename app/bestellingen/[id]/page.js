import { getOrders, getproductName } from "../../../lib/supabaseAPI";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

export default async function Page({ params }) {
  const orders = await getOrders(params.id);
  const order = orders[0];

  console.log(order);

  //fetch products with order.producten from supabase

  return (
    <div className="">
      <div>
        <h1 className="text-2xl">Bestelling #{order.id}</h1>
      </div>
      <div>
        <h1 className="text-2xl">Bestelde producten</h1>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
