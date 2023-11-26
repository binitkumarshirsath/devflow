import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Filter } from "@/types";

interface Props {
  filters: Filter[];
}

const Filters = ({ filters }: Props) => {
  return (
    <div className="mt-6 flex gap-4 max-md:hidden">
      {filters.map((filter, index) => {
        return (
          <Link key={index} href={filter.name}>
            <Button className="tab font-montserrat">{filter.name}</Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Filters;
