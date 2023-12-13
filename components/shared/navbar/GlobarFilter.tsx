import { GlobalSearchFilters } from "@/constants/filters";
import { clearUrlQuery, formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const GlobarFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const handleClick = (value: string) => {
    if (value === type) {
      const newURL = clearUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["type"],
      });
      router.push(newURL);
    } else {
      const newURL = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: value || "",
      });
      router.push(newURL);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">Type :</div>
      {GlobalSearchFilters.map((filter) => {
        const isActive = type === filter.value;

        return (
          <button
            key={filter.name}
            onClick={() => handleClick(filter.value)}
            className={`   ${
              isActive ? "bg-primary-500 " : "background-light900_dark200"
            }  rounded-xl px-3 py-2 text-xs`}
          >
            {filter.name}
          </button>
        );
      })}
    </div>
  );
};

export default GlobarFilter;
