import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "@/types";

interface Props {
  filters: Filter[];
}

function MobileFilter({ filters }: Props) {
  return (
    <Select>
      <SelectTrigger
        className="placeholder 
      background-light900_dark300
       h-12 w-full rounded-lg border-none pl-10  pr-4 font-spaceGrotesk  font-medium focus:outline-none focus:ring-0   focus:ring-offset-0 md:hidden"
      >
        <SelectValue placeholder="Select a Filter" />
      </SelectTrigger>
      <SelectContent className="border-none outline-none focus:no-underline">
        <SelectGroup>
          {filters.map((filter, index) => {
            return (
              <SelectItem key={index} value={filter.value}>
                {filter.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default MobileFilter;
