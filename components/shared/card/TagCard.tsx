// import { getTopInteractedTags } from "@/lib/actions/tag.action";
import React from "react";
import { ITag } from "@/database/models/tag.model";
import Link from "next/link";

interface Props {
  tag: ITag;
}

const TagCard = async ({ tag }: Props) => {
  // const tags = await getTopInteractedTags();

  return (
    <Link
      href={"/tags/" + tag.id}
      className="background-light900_dark200 flex  h-full min-h-[10rem] w-full flex-col items-center justify-center rounded-2xl px-4 py-3"
    >
      <div className="h2-bold mt-4 flex flex-col overflow-hidden px-4 text-center font-spaceGrotesk font-semibold">
        {tag.name.toUpperCase()}
        <span className="text-dark500_light500  text-sm ">
          {tag.questions.length}+ Questions
        </span>
      </div>
    </Link>
  );
};

export default TagCard;
