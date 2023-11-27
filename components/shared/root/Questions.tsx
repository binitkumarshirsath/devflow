import { QuestionProps } from "@/app/(root)/(home)/page";
import React from "react";
import QuestionCard from "../card/QuestionCard";

const Questions = ({ questions }: { questions: QuestionProps[] }) => {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-7">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default Questions;
