import React from "react";

import SearchBar from "../SearchBar";

const GlobalSearch = () => {
  return (
    <div className="mx-auto ml-10 flex w-full justify-center max-sm:hidden">
      <SearchBar name="globalsearch" placeholder="Search globally..." />
    </div>
  );
};

export default GlobalSearch;
