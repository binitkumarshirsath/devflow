import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import "@/styles/theme.css";
import ParseHTML from "../root/ParseHTML";
import { AnswerProps } from "@/types";

interface Props {
  data: AnswerProps;
}

const AnswerCard = ({ data }: Props) => {
  console.log(data.createdAt);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-end   gap-x-2">
          <Image
            height={50}
            width={50}
            src={data.author.picture}
            alt="author-pfp"
            className=" bg-circle ml-[-10px]"
          />
          {data.author.name}
          <span className="text-dark500_light500 text-sm">
            answered {formatDate(data.createdAt)}
          </span>
        </div>
        <div>Upvotes</div>
      </div>
      <div className="mx-auto mt-4  ">
        <ParseHTML data={data.content} />
      </div>
    </div>
  );
};

export default AnswerCard;
