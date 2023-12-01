import MobileFilter from "@/components/shared/root/MobileFilter";
import SearchBar from "@/components/shared/root/SearchBar";
import { UserFilters } from "@/constants/filters";
import React from "react";

const Community = () => {
  return (
    <div className="text-dark100_light900 flex flex-col gap-2 ">
      <div className=" font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Community
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex items-center justify-between gap-4  max-sm:flex-col">
          <div className="">
            <SearchBar
              name="users"
              placeholder="Search amazing minds here..."
              classList="max-h-12 text-sm font-montserrat font-base"
            />
          </div>
          <div className="">
            <MobileFilter filters={UserFilters} visible={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
