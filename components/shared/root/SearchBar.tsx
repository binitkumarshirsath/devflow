"use client";
import { clearUrlQuery, formUrlQuery } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Props {
  placeholder: string;
  name: string;
  classList?: string;
  route?: string;
}

const SearchBar = ({ placeholder, name, classList, route }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const q = searchParams.get("q");
  const [searchQuery, setSearchQuery] = useState(q || "");
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          // params is sent to maintain other filters like sorting
          params: searchParams.toString(),
          key: "q",
          value: searchQuery,
        });
        router.push(newUrl);
      } else {
        if (pathname === route) {
          const newURL = clearUrlQuery({
            keysToRemove: ["q"],
            params: searchParams.toString(),
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 400);

    return () => clearTimeout(debounceFn);
  }, [searchParams, searchQuery, router, pathname, route]);

  return (
    <div className=" relative  flex h-full w-full items-center md:w-[600px]  ">
      <input
        className={`placeholder 
        background-light800_dark400 
         h-12 w-full rounded-lg border-none pl-12  pr-4  font-spaceGrotesk font-medium focus:outline-none focus:ring-0    focus:ring-offset-0 ${classList} `}
        type="text"
        name={name}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        id=""
      />
      <div className="pointer-events-none absolute ml-4">
        <SearchIcon className=" text-light-400 " />
      </div>
    </div>
  );
};

export default SearchBar;
