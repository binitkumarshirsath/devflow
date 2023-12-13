"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clearUrlQuery, formUrlQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [search, SetSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  // close the result popup
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => removeEventListener("click", handleClickOutside);
  }, [isOpen, pathName]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          key: "global",
          params: searchParams.toString(),
          value: search,
        });
        router.push(newUrl);
      } else {
        setIsOpen(false);
        const newUrl = clearUrlQuery({
          keysToRemove: ["q", "global"],
          params: searchParams.toString(),
        });

        router.push(newUrl);
      }
    }, 400);
    return () => clearTimeout(debounce);
  }, [search, searchParams, router]);

  return (
    <div className="relative mx-auto ml-10   flex flex-col items-center justify-center max-sm:hidden">
      <div
        ref={ref}
        className=" relative  flex h-full w-full items-center md:w-[600px]  "
      >
        <input
          value={search}
          onChange={(e) => {
            setIsOpen(true);
            SetSearch(e.target.value);
          }}
          className={`placeholder 
        background-light800_dark400 
         h-12 w-full rounded-lg border-none pl-12  pr-4  font-spaceGrotesk font-medium focus:outline-none focus:ring-0    focus:ring-offset-0 `}
          type="text"
          placeholder="Search Globally here"
          id=""
        />
        <div className="pointer-events-none absolute ml-4">
          <SearchIcon className=" text-light-400 " />
        </div>
        {isOpen && <GlobalResult />}
      </div>
    </div>
  );
};

export default GlobalSearch;
