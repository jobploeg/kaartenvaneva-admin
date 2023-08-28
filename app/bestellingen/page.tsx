import { supabase } from "../../lib/supabaseClient";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("id, products_names, total_price, isPaid, name, address");

  if (error) {
    throw error;
  }
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
