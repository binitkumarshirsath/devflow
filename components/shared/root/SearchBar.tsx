import { SearchIcon } from "lucide-react";
import React from "react";

interface Props {
  placeholder: string;
  name: string;
  classList?: string;
}

const SearchBar = ({ placeholder, name, classList }: Props) => {
  return (
    <div className=" relative  flex h-full w-full items-center md:w-[600px]  ">
      <input
        className={`placeholder background-light900_dark300 mx-auto  h-12 w-full rounded-2xl border-white   pl-12 pr-4  font-spaceGrotesk font-medium text-dark-400 focus:outline-none dark:text-white ${classList} `}
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
