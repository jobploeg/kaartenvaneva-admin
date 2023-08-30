"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  producten: string;
  prijs: number;
  status: "true" | "false" | "failed";
  naam: string;
  address: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "producten",
    header: "Producten",
    cell: ({ row }) => {
      return (
        <Link
          href={`/bestellingen/${row.original.id}`}
          className="hover:underline"
        >
          <p>{row.original.producten}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "naam",
    header: "Naam",
    cell: ({ row }) => {
      return (
        <Link
          href={`/bestellingen/${row.original.id}`}
          className="hover:underline"
        >
          <p>{row.original.naam}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return (
        <Link
          href={`/bestellingen/${row.original.id}`}
          className="hover:underline"
        >
          <p>{row.original.address}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "prijs",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prijs
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("prijs"));
      const formatted = (amount / 100).toFixed(2);

      return (
        <Link
          href={`/bestellingen/${row.original.id}`}
          className="hover:underline"
        >
          <p>€ {formatted}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-right -mr-5">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="">Status</div>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const paid = row.getValue("status");
      if (paid === "false") {
        return (
          <div className="text-right font-medium text-orange-600">
            <Link
              href={`/bestellingen/${row.original.id}`}
              className="hover:underline"
            >
              <p>In behandeling</p>
            </Link>
          </div>
        );
      } else if (paid === "true") {
        return (
          <div className="text-right font-medium text-green-700">
            <Link
              href={`/bestellingen/${row.original.id}`}
              className="hover:underline"
            >
              Betaald
            </Link>
          </div>
        );
      } else if (paid === "failed") {
        return (
          <div className="text-right font-medium text-red-700">
            <Link
              href={`/bestellingen/${row.original.id}`}
              className="hover:underline"
            >
              Mislukt
            </Link>
          </div>
        );
      }
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
                <Link href={`/orders/${productId}`}>bekijken</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
