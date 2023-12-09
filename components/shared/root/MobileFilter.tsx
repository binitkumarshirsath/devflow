"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { clearUrlQuery, formUrlQuery } from "@/lib/utils";

interface Props {
  filters: Filter[];
  visible?: boolean;
}

function MobileFilter({ filters, visible }: Props) {
  const searchParams = useSearchParams();
  const q = searchParams.get("filter");
  const [active, setActive] = React.useState(q || "");

  const router = useRouter();

  const handleClick = (value: string) => {
    if (value === active) {
      setActive("");
      const removeUrl = clearUrlQuery({
        keysToRemove: ["filter"],
        params: searchParams.toString(),
      });
      router.push(removeUrl, { scroll: false });
    } else {
      setActive(value);
      const newUrl = formUrlQuery({
        key: "filter",
        params: searchParams.toString(),
        value,
      });

      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <Select onValueChange={(value) => handleClick(value)} defaultValue={active}>
      <SelectTrigger
        className={`placeholder 
      background-light800_dark300
       h-12 w-full gap-2 rounded-lg border-none px-4 font-spaceGrotesk  font-medium focus:outline-none  focus:ring-0 focus:ring-offset-0  ${
         visible ? "" : "lg:hidden"
       } `}
      >
        <SelectValue placeholder="Select a Filter" />
      </SelectTrigger>
      <SelectContent className="background-light800_dark300 border-none   outline-none focus:no-underline">
        <SelectGroup className="background-light800_dark300 dark:hover:bg-dark-100 ">
          {filters.map((filter, index) => {
            return (
              <SelectItem
                className="background-light800_dark300 cursor-pointer dark:hover:bg-dark-100"
                key={index}
                value={filter.value}
              >
                {filter.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default MobileFilter;
