import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";

async function removeProduct(id) {
  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (data) {
    toast.success("Product is verwijderd!");
  }
  if (error) {
    toast.error("Er is iets fout gegaan, probeer het later opnieuw!");
  }
}

export default async function remove({ params }) {
  const deleted = await removeProduct(params.id);
}
