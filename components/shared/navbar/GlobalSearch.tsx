import React from "react";
import { SearchIcon } from "lucide-react";

const GlobalSearch = () => {
  return (
    <div className="background-light900_dark200 relative ml-10 h-full  rounded-full  max-md:hidden md:w-[600px]  ">
      <input
        className="placeholder mx-auto  h-12  w-full rounded-full border bg-light-700  pl-12 pr-4  font-spaceGrotesk font-medium text-dark-400 focus:outline-none  dark:bg-dark-100 dark:text-white  md:rounded-sm md:border-transparent"
        type="text"
        name=""
        placeholder="Global search"
        id=""
      />
      <div className="absolute left-2 top-[10px]">
        <SearchIcon className=" text-slate-700 " />
      </div>
    </div>
  );
};

export default GlobalSearch;
