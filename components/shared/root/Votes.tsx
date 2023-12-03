"use client";

import Image from "next/image";
import React from "react";

interface Props {
  userId: string;
  questionId?: string;
  hasUpvoted: boolean;
  upvotes: number;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
  type: "question" | "answer";
}

const Votes = ({
  hasDownVoted,
  upvotes,
  downvotes,
  hasUpvoted,
  questionId,
  type,
  userId,
  hasSaved,
}: Props) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex justify-end gap-1 text-end">
        <Image
          alt="upvote"
          src={
            hasUpvoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          width={18}
          height={18}
        />
        <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">{upvotes}</p>
        </div>
      </div>
      <div className="flex justify-end gap-1 text-end">
        <Image
          alt="downvote"
          src={
            hasDownVoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          width={18}
          height={18}
        />
        <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">{downvotes}</p>
        </div>
      </div>
      <div className="flex justify-end gap-1 text-end">
        {type === "question" && (
          <Image
            alt="saved"
            src={
              hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star.svg"
            }
            width={18}
            height={18}
          />
        )}
      </div>
    </div>
  );
};

export default Votes;
