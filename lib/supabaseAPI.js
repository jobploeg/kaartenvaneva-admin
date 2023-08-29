import { supabase } from "../lib/supabaseClient";

export async function getProduct(id) {
  //get products with id and foreign key
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, description, price, categories:categories (name), imageURLs"
    )
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
}

export async function getOrders(id) {
  //get products with id and foreign key
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
}

export async function getproductName(name) {
  //get products with id and foreign key
  const { data, error } = await supabase
    .from("orders")
    .select("")
    .in("producten", name);

  if (error) {
    throw error;
  }

  return data;
}
