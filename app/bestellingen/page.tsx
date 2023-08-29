import { supabase } from "../../lib/supabaseClient";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("id, producten, prijs, status, naam, address");

  if (error) {
    throw error;
  }
  return data;
}

export default async function DemoPage() {
  const data = await getData();
  const dataLength = data.length;

  return (
    <div className="mx-5 py-10 md:px-16">
      <div className="flex justify-between pb-5 md:-mt-2">
        <h1 className="text-3xl font-semibold">Bestellingen ({dataLength})</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
