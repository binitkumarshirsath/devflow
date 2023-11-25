"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";
import { LogInIcon, User2Icon } from "lucide-react";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="background-light900_dark200 custom-scrollbar fixed inset-y-0 overflow-y-scroll pt-20 max-sm:hidden">
      <div className="mt-16 flex flex-col gap-2 px-4 py-2">
        {sidebarLinks.map((link, index) => {
          const isActive = link.route === pathname;

          return (
            <Link
              href={link.route}
              key={index}
              className={`flex gap-4 rounded-lg
                p-5 font-montserrat text-lg ${
                  isActive ? "primary-gradient font-bold" : ""
                }`}
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <span className="max-md:hidden">{link.label}</span>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-2  px-4 py-2">
          <Link
            className="my-4 flex  justify-center rounded-lg bg-slate-50 px-4 py-2 font-spaceGrotesk font-semibold text-primary-500 hover:bg-slate-100 dark:bg-dark-400"
            href={"/sign-up"}
          >
            <span className="max-md:hidden">Register</span>
            <span className="md:hidden">
              <User2Icon />
            </span>
          </Link>
          <Link
            className="flex justify-center rounded-lg bg-slate-50 py-2 font-spaceGrotesk font-semibold hover:bg-slate-100 dark:bg-dark-400 md:px-4 "
            href={"/sign-in"}
          >
            <span className="max-md:hidden">Login</span>
            <span className="md:hidden">
              <LogInIcon />
            </span>
          </Link>
        </div>
      </SignedOut>
    </aside>
  );
};

export default LeftSideBar;
