"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { Button } from "../../components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  title: string;
  categories: any;
  price: number;
};

async function deleteRow(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    toast.error("Er is iets mis gegaan, probeer het later opnieuw");
  }

  if (!error) {
    toast.success("Product verwijderd!");
  }
}
export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-1"
        >
          Titel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="pl-3">
          <Link
            href={`/producten/${row.original.id}`}
            className="hover:underline"
          >
            <p>{row.original.title}</p>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Categorie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="pl-3">
          <Link
            href={`/dashboard/producten/${row.original.id}`}
            className="hover:underline"
          >
            <p>{row.original.categories.name}</p>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Prijs
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return (
        <div>
          <Link
            href={`/producten/${row.original.id}`}
            className="hover:underline"
          >
            <p>{formatted}</p>
          </Link>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original.id;

      return (
        <div className="text-right pr-3 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-right shadow-none"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-right" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opties</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href={`/producten/${productId}`}>bekijken</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/producten/${productId}/edit`}>Bewerken</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AlertDialog>
                <AlertDialogTrigger className="text-red-700 text-sm p-2 hover:bg-neutral-100 rounded w-full text-start">
                  Verwijderen
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deze actie kan niet ongedaan worden
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-800">
                      <button onClick={() => deleteRow(row.original.id)}>
                        Doorgaan
                      </button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
