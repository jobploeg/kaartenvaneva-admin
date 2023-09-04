"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { cn } from "../../../lib/utils";

import Editor from "react-simple-wysiwyg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Key, useState } from "react";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  images: z.string(),

  price: z.string().refine((val) => {
    return !isNaN(Number(val));
  }, "Price must be a number"),
});

export default function ProfileForm({ categories }) {
  const [pictures, setPictures] = useState<any>([
    {
      data: [],
      url: "",
    },
  ]);

  const handleImageUpload = (e: { target: { files: any } }) => {
    const tempArr = [];

    [...e.target.files].forEach((file) => {
      tempArr.push({
        data: file,
        url: uuidv4(),
      });
    });

    setPictures(tempArr);
    console.log(tempArr);
  };

  const saveImage = (pictures: any[]) => {
    pictures.forEach(
      async (picture: {
        url: string;
        data:
          | string
          | Blob
          | ArrayBuffer
          | ArrayBufferView
          | Buffer
          | File
          | FormData
          | NodeJS.ReadableStream
          | ReadableStream<Uint8Array>
          | URLSearchParams;
      }) => {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(picture.url, picture.data);
        if (error) {
          throw error;
        }
      }
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      images: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    saveImage(pictures);

    // save the form data to supabase
    const { data, error } = await supabase.from("products").insert([
      {
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        imageURLs: pictures.map((picture: { url: string }) => picture.url),
      },
    ]);
    if (error) {
      toast.error(
        "Er is een probleem met het toevoegen van het product. Probeer het later opnieuw."
      );
    } else {
      toast.success("Product toegevoegd!");
      form.reset();
    }
  }

  const [html, setHtml] = useState("");

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-screen px-5 md:w-auto md:px-0"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel</FormLabel>
              <FormControl>
                <Input placeholder="Titel" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschrijving</FormLabel>
              <FormControl>
                <Editor value={html} onChange={onChange} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prijs</FormLabel>
              <FormControl>
                <Input placeholder="€" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorie</FormLabel>
              <br />
              <FormControl>
                <select
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-[200px] appearance-none bg-transparent font-normal"
                  )}
                  {...field}
                >
                  {categories.map((category: { id: any; name: string }) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Afbeeldingen</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  accept="image/*"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Toevoegen</Button>
      </form>
      {/* <ToastContainer /> */}
    </Form>
  );
}
