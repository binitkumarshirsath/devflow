import React from "react";
import QuestionCard from "../card/QuestionCard";
import { QuestionProps } from "@/types";

const Questions = ({ questions }: { questions: QuestionProps[] }) => {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-7">
      {questions &&
        questions.map((question: any) => (
          <QuestionCard key={question.id} question={question} />
        ))}
    </div>
  );
};

export default Questions;
