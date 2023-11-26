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
        className={`placeholder 
        background-light900_dark300
         h-12 w-full rounded-lg border-none pl-12  pr-4  font-spaceGrotesk font-medium focus:outline-none focus:ring-0   focus:ring-offset-0 ${classList} `}
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
