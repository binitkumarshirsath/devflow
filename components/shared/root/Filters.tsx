import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Filter } from "@/types";

interface Props {
  filters: Filter[];
}

const Filters = ({ filters }: Props) => {
  return (
    <div className="mt-6 flex gap-4 max-md:hidden">
      {filters.map((filter) => {
        return (
          <Link key={filter.id} href={filter.label}>
            <Button className="tab font-montserrat">{filter.label}</Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Filters;
