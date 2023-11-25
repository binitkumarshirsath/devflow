import React from "react";
import { ModeToggle } from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn } from "@clerk/nextjs";
import Sidebar from "./MobileSideBar";
import GlobalSearch from "./GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed  z-50 w-full gap-x-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link href={"/"} className="flex gap-2">
        <Image
          src="/assets/images/site-logo.svg"
          alt="devflow logo"
          width={25}
          height={25}
        />
        <p className="h2-bold flex gap-1 font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex items-center gap-2">
        <ModeToggle />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <Sidebar />
      </div>
    </nav>
  );
};

export default Navbar;
