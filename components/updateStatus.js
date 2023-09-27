"use client";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";
import { Resend } from "resend";
import { verzonden } from "../emails/verzonden";

const resend = new Resend("re_X5p3MH8m_8eRJzTvbFp6GrBsUwK9Abc67");

async function updateStatus(id, email) {
  const { error } = await supabase
    .from("orders")
    .update([
      {
        verzonden: true,
      },
    ])
    .eq("id", id);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Bestelling geslaagd!",
    react: verzonden,
  });

  if (error) {
    toast.error("Er is iets mis gegaan, probeer het later opnieuw");
  }

  if (!error) {
    toast.success("Mail verzonden!");
  }
}

export default function UpdateStatus({ id, email }) {
  return <button onClick={() => updateStatus(id, email)}>Doorgaan</button>;
}
