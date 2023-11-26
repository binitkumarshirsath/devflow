"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { themes } from "@/constants";
import Image from "next/image";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex">
        <Button size="icon" className=" border-none">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-yellow-500 transition-all duration-150 dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-primary-500 transition-all duration-150 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="background-light850_dark100  cursor-pointer rounded border-none "
      >
        {themes.map((link, index) => {
          const isActiveTheme = link.value === theme;
          return (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-2 px-2 font-montserrat font-semibold hover:bg-slate-100 dark:hover:bg-dark-500 dark:hover:text-white"
              onClick={() => setTheme(link.value)}
            >
              <Image src={link.icon} alt={link.label} width={16} height={16} />
              <DropdownMenuItem
                className={`cursor-pointer dark:hover:bg-dark-500 ${
                  isActiveTheme ? "text-primary-500" : ""
                }`}
              >
                {link.label}
              </DropdownMenuItem>
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
