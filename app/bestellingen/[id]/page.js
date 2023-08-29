import { getOrders, getproductName } from "../../../lib/supabaseAPI";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

export default async function Page({ params }) {
  const orders = await getOrders(params.id);
  const order = orders[0];

  return (
    <div className="flex flex-col p-32">
      <p>{order?.naam}</p>
      <p>{order?.address}</p>
      <p>{order?.prijs}</p>
      <p>{order?.status}</p>
      <p>{order?.producten}</p>
    </div>
  );
}
