import { formatDate } from "@/lib/utils";
import React from "react";
import Metric from "./Metric";
import RenderTags from "../root/RenderTags";
import Link from "next/link";
import { QuestionProps } from "@/types";
import EditDelete from "../root/EditDelete";
import { auth } from "@clerk/nextjs";

interface Props {
  question: QuestionProps;
}

const QuestionCard = ({ question }: Props) => {
  const { userId } = auth();
  return (
    <div className="card-wrapper flex flex-col gap-2 rounded-lg p-4 sm:p-5 md:p-7 ">
      {/* card title */}
      <div className="flex items-start  justify-between gap-4">
        <Link
          href={"/question/" + question._id}
          className="flex flex-col font-montserrat text-base font-semibold"
        >
          <span className="font-montserrat text-xs dark:text-light-400 sm:hidden ">
            Posted: {formatDate(question.createdAt)}
          </span>
          {question.title}
        </Link>
        {userId && userId === question.author.clerkId && (
          <EditDelete
            questionId={question._id}
            userId={userId}
            clerkId={question.author.clerkId}
          />
        )}
      </div>
      {/* card tags */}
      <RenderTags item={question.tags} />
      {/* Info row */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <Metric
          src={question.author.picture}
          alt="userpfp"
          styles="bg-circle"
          createdAt={question.createdAt}
          label={question.author.name}
          size={20}
          href={`profile/${question.author._id}`}
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
