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
  visible?: boolean;
}

function MobileFilter({ filters, visible }: Props) {
  return (
    <Select>
      <SelectTrigger
        className={`placeholder 
      background-light800_dark300
       h-12 w-full rounded-lg border-none px-4 font-spaceGrotesk  font-medium focus:outline-none  focus:ring-0 focus:ring-offset-0 md:pl-10 ${
         visible ? "" : "lg:hidden"
       } `}
      >
        <SelectValue placeholder="Select a Filter" />
      </SelectTrigger>
      <SelectContent className="background-light850_dark100 border-none  outline-none focus:no-underline">
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
