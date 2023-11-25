import React from "react";
import { SearchIcon } from "lucide-react";

const GlobalSearch = () => {
  return (
    <div className="background-light900_dark200 relative h-full w-full max-w-[650px]  ">
      <input
        className="background-light800_dark400 placeholder h-[50px] w-[400px] rounded  border border-primary-500 pl-12 font-montserrat font-semibold  focus:outline-none focus:ring focus:ring-primary-100 md:h-[45px] md:w-full md:rounded-3xl md:border-transparent"
        type="text"
        name=""
        placeholder="Global search"
        id=""
      />
      <div className="absolute left-2 top-[10px]">
        <SearchIcon className="text-black dark:text-white" />
      </div>
    </div>
  );
};

export default GlobalSearch;
