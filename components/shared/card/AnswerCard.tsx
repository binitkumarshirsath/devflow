import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import "@/styles/theme.css";
import ParseHTML from "../root/ParseHTML";
import { AnswerProps } from "@/types";
import Link from "next/link";
import Votes from "../root/Votes";

interface Props {
  data: AnswerProps;
  userId: string;
  questionId: string;
  hasSaved: boolean;
}

const AnswerCard = ({ data, userId, questionId, hasSaved }: Props) => {
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
            hasSaved={hasSaved}
            answerId={JSON.parse(JSON.stringify(data._id))}
            downvotes={data.downvotes.length}
            upvotes={data.upvotes.length}
            hasDownVoted={data.downvotes.includes(userId)}
            hasUpvoted={data.upvotes.includes(userId)}
            questionId={questionId}
            userId={userId}
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
