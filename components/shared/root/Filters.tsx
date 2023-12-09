"use client";

import { Button } from "@/components/ui/button";
import { clearUrlQuery, formUrlQuery } from "@/lib/utils";

import { Filter } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  filters: Filter[];
}

const Filters = ({ filters }: Props) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("filter");
  const [active, setActive] = useState(q || "");

  const router = useRouter();

  const handleClick = (value: string) => {
    // clicked the same filter twice, need to toggle it
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
    <div className="mt-6 flex gap-4 max-lg:hidden">
      {filters.map(({ value, name }, index) => {
        const isActive = value === active;
        return (
          <Button
            key={index}
            onClick={() => handleClick(value)}
            className={` ${
              isActive ? "text-primary-500" : "text-light-500"
            } min-h-full bg-light-800 font-montserrat   dark:bg-dark-400`}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};

export default Filters;
