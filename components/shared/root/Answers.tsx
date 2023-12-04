import { AnswerProps } from "@/types";
import React from "react";
import AnswerCard from "./AnswerCard";

const Answer = ({ answers }: { answers: AnswerProps[] }) => {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-7">
      {answers &&
        answers.map((answer) => (
          <AnswerCard key={answer._id} answer={answer} />
        ))}
    </div>
  );
};

export default Answer;
