"use client";

import { viewQuestion } from "@/lib/actions/interaction.action";
import { saveQuestion } from "@/lib/actions/question.action";
import {
  downvoteAnswer,
  downvoteQuestion,
  upvoteAnswer,
  upvoteQuestion,
} from "@/lib/actions/votes.action";
import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props {
  userId: string;
  questionId?: string;
  answerId?: string;
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
  answerId,
}: Props) => {
  const handleVote = async (action: "upvote" | "downvote") => {
    const path = "/question/" + questionId;
    if (type === "question") {
      if (action === "upvote") {
        await upvoteQuestion({
          hasdownVoted: hasDownVoted,
          hasupVoted: hasUpvoted,
          questionId: questionId!,
          userId,
          path,
        });
      }
      if (action === "downvote") {
        await downvoteQuestion({
          hasdownVoted: hasDownVoted,
          hasupVoted: hasUpvoted,
          questionId: questionId!,
          userId,
          path,
        });
      }
    }

    if (type === "answer") {
      if (action === "upvote") {
        await upvoteAnswer({
          answerId: answerId!,
          hasdownVoted: hasDownVoted,
          hasupVoted: hasUpvoted,
          path,
          userId,
        });
      }
      if (action === "downvote") {
        await downvoteAnswer({
          path,
          answerId: answerId!,
          hasdownVoted: hasDownVoted,
          hasupVoted: hasUpvoted,
          userId,
        });
      }
    }
  };

  const handleSave = async () => {
    const path = "/question/" + questionId;
    await saveQuestion({
      hasSaved: hasSaved!,
      path,
      questionId: questionId!,
      userId,
    });
  };

  const pathName = usePathname();
  // for increating views of question
  useEffect(() => {
    if (type === "question" && questionId) {
      viewQuestion({ questionId, userId, path: pathName });
    }
  }, [questionId, userId, type, pathName]);

  return (
    <div className="flex items-center gap-1">
      <div className="flex justify-end gap-1 text-end">
        <Image
          alt="upvote"
          onClick={() => handleVote("upvote")}
          src={
            hasUpvoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          width={18}
          height={18}
          className="cursor-pointer"
        />
        <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">{upvotes}</p>
        </div>
      </div>
      <div className="flex justify-end gap-1 text-end">
        <Image
          alt="downvote"
          onClick={() => handleVote("downvote")}
          src={
            hasDownVoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          width={18}
          className="cursor-pointer"
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
            onClick={handleSave}
            width={18}
            className="cursor-pointer"
            height={18}
          />
        )}
      </div>
    </div>
  );
};

export default Votes;
