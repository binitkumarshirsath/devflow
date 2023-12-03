import NoResults from "@/components/shared/root/NoResults";
import Questions from "@/components/shared/root/Questions";
import { getTagQuestions } from "@/lib/actions/tag.action";
import React from "react";

interface Props {
  params: {
    tagId: string;
  };
}

const TagDetails = async ({ params: { tagId } }: Props) => {
  const { questions, tagName } = await getTagQuestions({ tagId });

  return (
    <div className="text-dark100_light900  flex w-full flex-col gap-2 ">
      <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        {tagName?.toUpperCase()}
      </div>

      {questions && questions.length === 0 ? (
        <NoResults
          title="No questions found for this Tag!"
          description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
          button={{
            href: "/ask-question",
            label: "Lets Go !",
            classList: "px-5 py-2 mt-5",
          }}
        />
      ) : (
        <Questions questions={questions} />
      )}
    </div>
  );
};

export default TagDetails;
