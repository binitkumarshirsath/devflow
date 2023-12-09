import TagCard from "@/components/shared/card/TagCard";
import MobileFilter from "@/components/shared/root/MobileFilter";
import SearchBar from "@/components/shared/root/SearchBar";
import { TagFilters } from "@/constants/filters";
import { ITag } from "@/database/models/tag.model";
import { getAllTags } from "@/lib/actions/tag.action";
import React from "react";

interface Props {
  searchParams: {
    q: string;
    filter: string;
  };
}

const Tag = async ({ searchParams: { q, filter } }: Props) => {
  const tags: ITag[] = await getAllTags({ searchQuery: q, filter });

  return (
    <div className="text-dark100_light900 flex flex-col gap-2 ">
      <div className=" font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Tags
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex items-center gap-4  max-sm:flex-col">
          <div className="w-full">
            <SearchBar
              route="/tags"
              name="tags"
              placeholder="Search by tag name...  "
              classList="max-h-12 text-sm font-montserrat font-base"
            />
          </div>
          <div className="w-full">
            <MobileFilter filters={TagFilters} visible={true} />
          </div>
        </div>

        {/* Render Tags */}
        <div className="mt-10 grid gap-4 sm:mt-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3  ">
          {tags.map((tag) => (
            <TagCard key={tag._id} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tag;
