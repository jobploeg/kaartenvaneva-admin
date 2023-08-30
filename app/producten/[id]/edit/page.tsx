import Form from "./form";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";

export type Categories = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  title: string;
  description: any;
  category: number;
  price: any;
  imageURLs: any;
};

async function getCategories(): Promise<Categories[]> {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    toast.error(
      "Er is een probleem met het ophalen van de producten. Probeer het later opnieuw."
    );
  }

  return data as Categories[];
}

async function getProduct(id): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) {
    toast.error(
      "Er is een probleem met het ophalen van de producten. Probeer het later opnieuw."
    );
  }

  return data as Product[];
}

export default async function Page({ params }) {
  const categories = await getCategories();
  const product = await getProduct(params.id);

  return (
    <div className="md:p-16 flex flex-col justify-center items-center mt-10 md:mt-0 ">
      <div className="md:w-3/4 bg-white md:p-10 shadow rounded-md mx-5">
        <Form categories={categories} product={product} />
      </div>
    </div>
  );
}
