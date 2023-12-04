import { AnswerProps } from "@/types";
import Link from "next/link";
import React from "react";
import Metric from "../card/Metric";

const AnswerCard = ({ answer }: { answer: AnswerProps }) => {
  return (
    <div className="card-wrapper flex flex-col gap-2 rounded-lg p-4 sm:p-5 md:p-7 ">
      {/* card title */}
      <Link
        href={"/question/" + answer.question._id}
        className="flex flex-col font-montserrat text-base font-semibold"
      >
        {answer.question.title}
      </Link>
      {/* card tags */}

      {/* Info row */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <Metric
          src={answer.author.picture}
          alt="userpfp"
          styles="bg-circle"
          createdAt={answer.createdAt}
          label={answer.author.name}
          size={20}
          href={`profile/${answer.author._id}`}
        />
        <div className="flex gap-4">
          <Metric
            alt="votes"
            src={"/assets/icons/like.svg"}
            label={" Votes"}
            count={answer.upvotes.length}
            size={15}
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
