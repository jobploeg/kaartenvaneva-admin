"use client";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

async function updateStatus(id) {
  console.log(id);
  const { error } = await supabase
    .from("orders")
    .update([
      {
        verzonden: true,
      },
    ])
    .eq("id", id);

  if (error) {
    toast.error("Er is iets mis gegaan, probeer het later opnieuw");
  }

  if (!error) {
    toast.success("Mail verzonden!");
  }
}

export default function UpdateStatus({ id }) {
  return <button onClick={() => updateStatus(id)}>Doorgaan</button>;
}
