import { SearchIcon } from "lucide-react";
import React from "react";

interface Props {
  placeholder: string;
  name: string;
}

const SearchBar = ({ placeholder, name }: Props) => {
  return (
    <div className="background-light900_dark200 relative  flex h-full w-full items-center md:w-[600px]  ">
      <input
        className="placeholder mx-auto  h-12 w-full rounded-2xl border-white bg-light-800  pl-12 pr-4  font-spaceGrotesk font-medium text-dark-400 focus:outline-none  dark:bg-dark-100 dark:text-white  "
        type="text"
        name={name}
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
