"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <aside
      className="background-light900_dark200 custom-scrollbar sticky inset-y-0 flex h-screen min-w-[200px]   flex-col overflow-y-auto border-none
      pt-20 max-md:hidden   lg:w-[266px]"
    >
      <div className="mt-16 flex h-fit flex-col gap-2 px-4 py-2">
        {sidebarLinks.map((link, index) => {
          const isActive = link.route === pathname;

          return (
            <Link
              href={link.route}
              key={index}
              className={`flex h-full w-full
                gap-4 rounded-lg font-montserrat text-lg max-lg:p-4 lg:p-5  ${
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
              <span className="max-sm:hidden max-sm:text-xs">{link.label}</span>
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
            <span className="max-lg:hidden">Register</span>
            <span className="md:hidden">
              <Image
                src={"/assets/icons/sign-up.svg"}
                alt="sign-up"
                width={20}
                height={20}
              />
            </span>
          </Link>
          <Link
            className="flex justify-center rounded-lg bg-slate-50 py-2 font-spaceGrotesk font-semibold hover:bg-slate-100 dark:bg-dark-400 md:px-4 "
            href={"/sign-in"}
          >
            <span className="max-lg:hidden">Login</span>
            <span className="md:hidden">
              <Image
                src={"/assets/icons/account.svg"}
                alt="login"
                width={20}
                height={20}
              />
            </span>
          </Link>
        </div>
      </SignedOut>
    </aside>
  );
};

export default LeftSideBar;
