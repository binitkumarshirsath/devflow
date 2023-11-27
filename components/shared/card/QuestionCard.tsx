import { QuestionProps } from "@/app/(root)/(home)/page";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <div className="flex gap-1">
          <Image
            alt="author"
            src={"/assets/icons/user.svg"}
            width={20}
            height={20}
          />
          <div>
            {question.author.name}
            {" | "}
            <span className="max-sm:hidden">
              {formatDate(question.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ">
          <div className="flex gap-1">
            <Image
              alt="votes"
              src={"/assets/icons/like.svg"}
              width={20}
              height={20}
            />
            {question.votes}
          </div>
          <div className="flex gap-1">
            <Image
              alt="votes"
              src={"/assets/icons/message.svg"}
              width={20}
              height={20}
            />
            {question.answers.length}
          </div>
          <div className="flex gap-1">
            <Image
              alt="viwes"
              src={"/assets/icons/eye.svg"}
              width={20}
              height={20}
            />
            {question.views}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
