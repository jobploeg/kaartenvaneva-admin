"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  products_names: string;
  total_price: number;
  isPaid: "true" | "false" | "failed";
  name: string;
  address: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "products_names",
    header: "Producten",
  },
  {
    accessorKey: "name",
    header: "Naam",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Prijs</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"));
      const formatted = "€ " + amount / 100;

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "isPaid",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const paid = row.getValue("isPaid");
      if (paid === "false") {
        return (
          <div className="text-right font-medium text-orange-600">
            In behandeling
          </div>
        );
      } else if (paid === "true") {
        return (
          <div className="text-right font-medium text-green-700">Betaald</div>
        );
      } else if (paid === "failed") {
        return (
          <div className="text-right font-medium text-red-700">Mislukt</div>
        );
      }
    },
  },
];
