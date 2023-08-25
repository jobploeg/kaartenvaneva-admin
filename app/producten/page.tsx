import { Products, columns } from "./columns";
import { DataTable } from "./data-table";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

async function getData(): Promise<Products[]> {
  const { data, error } = await supabase
    .from("products")
    .select("title, categories:categories (name), price, id");

  if (error) {
    toast.error("Er is iets misgegaan, probeer het later opnieuw");
    return [];
  }

  return data as Products[];
}

export default async function Page() {
  const data = await getData();
  const dataLength = data.length;

  return (
    <div className="mx-5 py-10 md:px-16">
      <div className="flex justify-between pb-5 md:-mt-2">
        <h1 className="text-3xl font-semibold">Producten ({dataLength})</h1>
        <Button>
          <Link href="/producten/create">Product toevoegen</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
