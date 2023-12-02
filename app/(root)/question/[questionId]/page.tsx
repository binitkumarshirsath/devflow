import Metric from "@/components/shared/card/Metric";
import { getQuestion } from "@/lib/actions/question.action";
import { formatDate } from "@/lib/utils";
import ParseHTML from "@/components/shared/root/ParseHTML";

import Image from "next/image";
import React from "react";
import RenderTags from "@/components/shared/root/RenderTags";

interface Props {
  params: { questionId: string };
}

const QuestionDetails = async ({ params: { questionId } }: Props) => {
  const question = await getQuestion({ questionId });

  return (
    <div className="flex w-full flex-col ">
      <div className="flex items-center justify-between">
        <div className="text-dark400_light800 flex items-center font-montserrat font-bold ">
          <Image
            src={question.author.picture}
            width={60}
            height={60}
            alt="user-pfp"
            className="bg-circle"
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
        <div className="mt-4 md:mt-10">
          <ParseHTML data={question.content} />
          <RenderTags item={question.tags} />
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
};

export default QuestionDetails;
