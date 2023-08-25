"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
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

export default function ProfileForm({ categories, product }) {
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
      title: product[0].title,
      description: product[0].description,
      price: product[0].price,
      category: product[0].category.categories,
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
      toast.success("Product geupdated!");
      form.reset();
    }
  }
  console.log(categories);

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
                <Input required {...field} />
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
                <Textarea placeholder="Beschrijving" required {...field} />
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
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: { id: any; name: string }) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

        <Button type="submit">Update</Button>
      </form>
      {/* <ToastContainer /> */}
    </Form>
  );
}
