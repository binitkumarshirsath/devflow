import React from "react";

interface Props {
  question: number;
  answer: number;
}

const StatsCard = ({ answer, question }: Props) => {
  return (
    <div className=" card-wrapper background-light900_dark200 flex justify-center gap-x-4 rounded-lg  py-8">
      <div className="text-dark200_light900 flex flex-col  font-bold ">
        {question}
        <span className="text-dark300_light700 text-sm  font-normal ">
          Questions
        </span>
      </div>
      <div className="text-dark200_light900 flex flex-col  font-bold ">
        {answer}
        <span className="text-dark300_light700 text-sm  font-normal ">
          Answers
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
