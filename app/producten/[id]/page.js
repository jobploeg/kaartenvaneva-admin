// import { useParams } from "next/navigation";
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
      <Link href={"/producten"} className="flex justify-end mr-32">
        <Button className="px-32 ">Terug</Button>
      </Link>
    </div>
  );
}
