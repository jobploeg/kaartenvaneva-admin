import { getProduct } from "../../../lib/supabaseAPI";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

export default async function Page({ params }) {
  const products = await getProduct(params.id);
  const product = products[0];

  const imageURLs = product.imageURLs;

  return (
    <div>
      <div className="fixed right-0 bottom-0 flex gap-5 mx-10">
        <Link href={`/producten/${product.id}/edit`} className="">
          <Button className="w-28 h-16 mb-1">Bewerken</Button>
        </Link>
        <Link href={"/producten"} className=" ">
          <Button className="w-28 h-16 mb-1">Terug</Button>
        </Link>
      </div>
      <div className="md:flex md:m-32 m-5">
        <div className="md:w-1/2">
          <Image
            src={
              "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
              imageURLs
            }
            alt={product.title}
            width={450}
            height={450}
            key={imageURLs}
            className="rounded"
          />
        </div>

        <div className="md:w-1/2 flex flex-col md:gap-5 gap-3">
          <h1 className="text-4xl font-medium mt-10 md:mt-0">
            {product.title}
          </h1>
          <p className="bg-gray-700 py-2 px-4 text-white rounded w-fit">
            {product.categories.name}
          </p>
          <p> {product.description}</p>
          <p className="text-xl"> € {product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
