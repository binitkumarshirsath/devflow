import Link from "next/link";
import React from "react";

interface Props {
  item: {
    name: string;
    id: string;
  }[];
}

const RenderTags = ({ item }: Props) => {
  return (
    <div className="flex gap-x-2 max-xs:max-w-xs">
      {item.map((tag) => (
        <Link
          key={tag.id}
          className="tab rounded-lg px-3 py-1 text-sm "
          href={"/tags/" + tag.id}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default RenderTags;
