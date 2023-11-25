"use client";
import React from "react";

import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          className="invert-colors mx-2"
          src="assets/icons/hamburger.svg"
          alt="hamburger menu"
          width={30}
          height={30}
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetHeader>
          <Link href={"/"} className="flex gap-2">
            <Image
              src="/assets/images/site-logo.svg"
              alt="devflow logo"
              width={20}
              height={20}
            />
            <p className="h2-bold flex gap-1 font-spaceGrotesk text-dark-100 dark:text-light-900 ">
              Dev <span className="text-primary-500">Flow</span>
            </p>
          </Link>
        </SheetHeader>
        <SheetDescription className="h2-bold mt-16 flex flex-col gap-2 px-4 py-2">
          {sidebarLinks.map((link, index) => {
            const isActive = link.route === pathname;

            return (
              <Link
                href={link.route}
                key={index}
                className={`flex gap-4 rounded-lg
                p-5 font-montserrat ${isActive ? "primary-gradient" : ""}`}
              >
                <Image
                  src={link.imgURL}
                  width={20}
                  height={20}
                  alt={link.label}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </SheetDescription>
        <SheetFooter>
          <SignedOut>
            <div className="flex w-full flex-col">
              <Link
                className="my-4 flex w-full justify-center rounded-lg bg-slate-50 px-4 py-2 font-spaceGrotesk font-semibold text-primary-500 hover:bg-slate-100 dark:bg-dark-400"
                href={"/sign-up"}
              >
                Register
              </Link>
              <Link
                className="flex w-full justify-center rounded-lg bg-slate-50 px-4 py-2 font-spaceGrotesk font-semibold hover:bg-slate-100 dark:bg-dark-400 "
                href={"/sign-in"}
              >
                Login
              </Link>
            </div>
          </SignedOut>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
