import { Button } from "@/components/ui/button";

import { Filter } from "@/types";

interface Props {
  filters: Filter[];
}

const Filters = ({ filters }: Props) => {
  const active = "newest";
  return (
    <div className="mt-6 flex gap-4 max-lg:hidden">
      {filters.map((filter, index) => {
        const isActive = filter.value === active;
        return (
          <Button
            key={index}
            className={` ${
              isActive ? "text-primary-500" : "text-light-500"
            } min-h-full bg-light-800 font-montserrat   dark:bg-dark-400`}
          >
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};

export default Filters;
