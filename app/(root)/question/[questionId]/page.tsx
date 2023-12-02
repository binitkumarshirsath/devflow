import Metric from "@/components/shared/card/Metric";
import { getQuestion } from "@/lib/actions/question.action";
import { formatDate } from "@/lib/utils";
import ParseHTML from "@/components/shared/root/ParseHTML";

import Image from "next/image";
import React from "react";
import RenderTags from "@/components/shared/root/RenderTags";
import UserAnswerBox from "@/components/shared/root/UserAnswerBox";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import AnswerCard from "@/components/shared/card/AnswerCard";
import { getAnswers } from "@/lib/actions/answer.action";
import { AnswerProps } from "@/types";

interface Props {
  params: { questionId: string };
}

const QuestionDetails = async ({ params: { questionId } }: Props) => {
  const { userId } = auth();
  const user = await getUserById(userId!);
  const question = await getQuestion({ questionId });
  const answers: AnswerProps[] = (await getAnswers({
    questionId,
  })) as AnswerProps[];

  return (
    <div className="flex w-full flex-col ">
      <div className="flex items-center justify-between">
        <div className="text-dark400_light800 flex items-center  font-montserrat font-bold ">
          <Image
            src={question.author.picture}
            width={120}
            height={120}
            alt="user-pfp"
            className="bg-circle ml-[-1.5rem]"
          />
          <div>{question.author.name}</div>
        </div>
        <div>Upvotes</div>
      </div>
      <div className="mt-10 flex w-full flex-col">
        <div className="h3-semibold">{question.title}</div>
        <div className="mt-2 flex gap-2">
          <Metric
            alt="asked"
            label=" asked"
            size={20}
            src="/assets/icons/clock.svg"
            count={formatDate(question.createdAt)}
          />
          <Metric
            alt="answers"
            label="Answers"
            size={20}
            src="/assets/icons/message.svg"
            count={question.answers.length}
          />
          <Metric
            alt="views"
            label="views"
            size={20}
            src="/assets/icons/eye.svg"
            count={question.views}
          />
        </div>
        <div className="mt-4 md:mt-10 ">
          <ParseHTML data={question.content} />
          <RenderTags item={question.tags} />
        </div>
        <div className="flex items-center justify-between font-montserrat  text-sm md:mt-5">
          <div className="text-dark500_light700 font-montserrat">
            Write your answer here :
          </div>
          <button className="background-light800_dark400 flex items-center gap-2 rounded-lg  px-3 py-1 text-primary-500">
            <Image
              alt="ai-ans"
              width={20}
              height={20}
              src={"/assets/icons/stars.svg"}
            />
            Generate AI answer
          </button>
        </div>

        <UserAnswerBox
          user={JSON.stringify(user._id)}
          question={JSON.stringify(question._id)}
        />

        {/* Answers of question */}
        <div className="mt-4 flex h-full w-full flex-col">
          {answers.map((answer, index) => (
            <AnswerCard data={answer} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
