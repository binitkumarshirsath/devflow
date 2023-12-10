"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { formUrlQuery } from "@/lib/utils";

const Pagination = ({
  page,
  hasNext = false,
}: {
  page: number;
  hasNext: boolean;
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleNavigation = (val: "next" | "prev") => {
    const nextPage = val === "next" ? page + 1 : page - 1;

    const newUrl = formUrlQuery({
      key: "page",
      params: searchParams.toString(),
      value: nextPage.toString(),
    });
    router.push(newUrl);
  };

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-2">
      <Button
        disabled={page === 1}
        onClick={() => handleNavigation("prev")}
        className="background-light900_dark200 text-white"
      >
        Prev
      </Button>
      <p className="rounded-md bg-primary-500 px-4 py-2 font-montserrat text-sm  font-semibold text-white">
        {page}
      </p>
      <Button
        disabled={hasNext === false}
        onClick={() => handleNavigation("prev")}
        className={`${hasNext ? "background-light900_dark200 text-white" : ""}`}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
