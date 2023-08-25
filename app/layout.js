import "./globals.css";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

export const metadata = {
  title: "admin - kaartenvaneva ",
  description: "Kaarten van Eva - admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🙃</text></svg>"
        ></link>
      </head>
      <body>
        <header className="h-16 w-screen  flex justify-between items-center md:px-10 px-5 border-b border-gray-400 mb-3">
          <div>
            <Link href={"/"} className="font-semibold text-xl hover:underline">
              DASHBOARD
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex gap-10 ">
              <Link href={"/bestellingen"} className="hover:underline">
                Bestellingen
              </Link>
              <Link href={"/producten"} className="hover:underline">
                Producten
              </Link>
              <Link href={"/categorieen"} className="hover:underline">
                categorieën
              </Link>
            </div>
          </div>
          <div className="block md:hidden">
            <DropdownMenu>
              <Button>
                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
              </Button>
              <DropdownMenuContent className="mx-5 mt-2 p-5">
                <Link href={"/bestellingen"}>
                  <DropdownMenuItem>Bestellingen</DropdownMenuItem>
                </Link>
                <Link href={"/producten"}>
                  <DropdownMenuItem>Producten</DropdownMenuItem>
                </Link>
                <Link href={"/categorieen"}>
                  <DropdownMenuItem>categorieën</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
