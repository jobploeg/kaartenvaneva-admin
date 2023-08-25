"use client";
import Link from "next/link";

import { Button } from "./ui/button";

import { Menu } from "lucide-react";

import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden md:block ">
      <div className="flex h-screen flex-col justify-between border-e bg-gray-100 fixed md:w-1/6 shadow-sm w-screen z-30">
        <div className="px-4 py-6">
          {/* <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          Logo
        </span> */}
          <Link href="/">
            <Menu
              className="w-10 h-10 absolute right-8 hover:cursor-pointer md:hidden"
              onClick={() => setOpen(!open)}
            />
          </Link>

          <ul className=" space-y-1 mt-20 md:mt-0">
            <li>
              <Link
                href="/"
                className="block rounded-lg px-4 py-1 text-gray-700"
              >
                <Button
                  variant="outline"
                  className="w-full text-md justify-start "
                >
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/producten"
                className="block rounded-lg px-4 py-1 text-gray-700"
              >
                <Button
                  variant="outline"
                  className="w-full text-md justify-start "
                >
                  Producten
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/bestellingen"
                className="block rounded-lg px-4 py-1 text-gray-700"
              >
                <Button
                  variant="outline"
                  className="w-full text-md justify-start "
                >
                  Bestellingen
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-gray-100 p-4 hover:bg-gray-50"
          >
            <img
              alt="Man"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwicmXMw2Du8UklsLK7zQVFllu3Gj137ELsDKENhLqQg&s"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">Lorem Ipsum</strong>

                <span> lorem@ipsum.com</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
