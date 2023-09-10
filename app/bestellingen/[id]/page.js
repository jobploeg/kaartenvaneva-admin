import { getOrders, getproductName } from "../../../lib/supabaseAPI";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

export default async function Page({ params }) {
  const orders = await getOrders(params.id);
  const order = orders[0];

  console.log(order);

  //fetch products with order.producten from supabase

  //get date
  const isoTimestamp = order.created_at;

  // Create a Date object from the ISO timestamp
  const dateObject = new Date(isoTimestamp);

  // Get the various date and time components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to the month because months are zero-based
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  // Create a readable timestamp
  const readableTimestamp = `${day}-${month}-${year} ${hours}:${minutes}`;

  return (
    <div className="">
      <div>
        <h1 className="text-2xl">Bestelling #{order.id}</h1>
        <p>{readableTimestamp}</p>
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
