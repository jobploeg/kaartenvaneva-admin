"use client";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Product({ product }) {
  const imageURLs = product.imageURLs;
  const imageLength = imageURLs.length;
  const [currentImage, setCurrentImage] = useState(imageURLs[0]);
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
              currentImage
            }
            alt={product.title}
            width={450}
            height={450}
            key={currentImage}
            className="rounded object-cover shadow h-fit"
          />
          <div className="flex">
            {imageURLs.map((imageURL) => {
              return (
                <Image
                  src={
                    "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
                    imageURL
                  }
                  alt={product.title}
                  width={450}
                  height={450}
                  key={imageURL}
                  className={`rounded object-cover h-32 w-32 mt-4 mr-4 shadow hover:cursor-pointer ${
                    imageURL === currentImage ? "border border-black" : ""
                  }
                ${imageLength === 1 ? "hidden" : "block "}
                `}
                  onClick={() => setCurrentImage(imageURL)}
                />
              );
            })}
          </div>
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
