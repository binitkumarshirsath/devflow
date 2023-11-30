import { QuestionProps } from "@/app/(root)/(home)/page";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Metric from "./Metric";

interface Props {
  question: QuestionProps;
}

const QuestionCard = ({ question }: Props) => {
  return (
    <div className="card-wrapper flex flex-col gap-2 rounded-lg p-4 sm:p-5 md:p-7 ">
      {/* card title */}
      <div className="flex flex-col font-montserrat text-base font-semibold">
        <span className="font-montserrat text-xs dark:text-light-400 sm:hidden ">
          Posted: {formatDate(question.createdAt)}
        </span>
        {question.title}
      </div>
      {/* card tags */}
      <div className="flex gap-4 ">
        {question.tags.map((tag) => (
          <Link
            key={tag.id}
            className="tab rounded-lg px-3 py-1 text-sm "
            href={tag.name}
          >
            {tag.name}
          </Link>
        ))}
      </div>
      {/* Info row */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <Metric
          src="/assets/icons/user.svg"
          alt="userpfp"
          createdAt={question.createdAt}
          label={question.author.name}
          size={15}
          href={`author/${question.author.id}`}
        />
        <div className="flex gap-4">
          <Metric
            alt="votes"
            src={"/assets/icons/like.svg"}
            createdAt={question.createdAt}
            label={" Votes"}
            count={question.upvotes.length}
            size={15}
          />
          <Metric
            alt="comments"
            src={"/assets/icons/message.svg"}
            label={" Comments"}
            size={15}
            count={question.answers.length}
          />
          <Metric
            alt="views"
            count={question.views}
            src={"/assets/icons/eye.svg"}
            label={" Views"}
            size={15}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
