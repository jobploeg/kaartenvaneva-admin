import { getOrders, getproductName } from "../../../lib/supabaseAPI";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

async function getProducts(ids) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .in("id", ids);

  if (error) {
    throw error;
  }

  return data;
}

function getTime(time) {
  //get date
  const isoTimestamp = time;

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
  return readableTimestamp;
}

export default async function Page({ params }) {
  const orders = await getOrders(params.id);
  const order = orders[0];
  const tempProducts = JSON.parse(order.producten);

  const productIds = tempProducts.map((product) => product.id);

  const products = await getProducts(productIds);
  const time = getTime(order.created_at);

  const tempProducten = JSON.parse(order.producten);

  function getQuantityById(id) {
    const product = tempProducten.find((product) => product.id === id);
    return product ? product.quantity : null;
  }

  return (
    <div className="mx-5 py-10 md:px-16">
      <div>
        <h1 className="text-4xl">Bestelling #{order.id}</h1>
        <p>{time}</p>
      </div>
      <div>
        <h1 className="text-2xl mt-10">Bestelde producten</h1>
        {products.map((product) => (
          <div
            key={product.id}
            className="mb-5 flex gap-2 flex-row  border rounded border-black p-4"
          >
            <div className="mt-1 mr-7">
              <Image
                src={
                  "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
                  product.imageURLs[0]
                }
                alt={product.title}
                height={110}
                width={110}
                loading="lazy"
                className="object-cover bg-center rounded w-48 h-32"
              />
            </div>
            <div className="md:pr-10 flex justify-between flex-col">
              <div>
                <Link href={`/producten/${product.id}`}>
                  <h1 className="text-2xl mb-1 hover:underline">
                    {product.title}
                  </h1>
                </Link>
                <p className="text-lg  mb-1">€ {product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xl font-semibold mb-1">
                  Aantal: {getQuantityById(product.id)}
                </p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
