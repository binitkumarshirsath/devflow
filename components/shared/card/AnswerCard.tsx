import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import "@/styles/theme.css";
import ParseHTML from "../root/ParseHTML";
import { AnswerProps } from "@/types";
import Link from "next/link";
import Votes from "../root/Votes";
import { ObjectId } from "mongoose";

interface Props {
  data: AnswerProps;
  userId: ObjectId;
  questionId: string;
}

const AnswerCard = ({ data, userId, questionId }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between">
        <Link
          href={"/profile/" + data.author.clerkId}
          className="flex items-end   gap-x-2"
        >
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
        </Link>
        <div>
          <Votes
            type="answer"
            downvotes={data.downvotes.length}
            upvotes={data.upvotes.length}
            hasDownVoted={data.downvotes.includes(userId)}
            hasUpvoted={data.upvotes.includes(userId)}
            questionId={questionId}
            userId={JSON.stringify(userId)}
          />
        </div>
      </div>
      <div className="mx-auto mt-4  ">
        <ParseHTML data={data.content} />
      </div>
    </div>
  );
};

export default AnswerCard;
