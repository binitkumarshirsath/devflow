import React from "react";
import QuestionCard from "../card/QuestionCard";

const Questions = ({ questions }: { questions: any }) => {
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
