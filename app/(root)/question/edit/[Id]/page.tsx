import QuestionForm from "@/components/form/QuestionForm";
import NoResults from "@/components/shared/root/NoResults";
import { getQuestion } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    Id: string;
  };
}

const EditQuestion = async ({ params: { Id } }: Props) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const question = await getQuestion({ questionId: Id });

  if (question.author.clerkId !== userId) {
    return (
      <NoResults
        title="Oops ! Something went wrong!"
        description="You are not the right person to access this page!"
        button={{
          label: "Home",
          alt: "home",
          href: "/",
          classList: "mt-10",
        }}
      />
    );
  }

  return (
    <div className="text-dark100_light900 flex flex-col gap-2">
      <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Edit Question
      </div>
      <div>
        <QuestionForm
          authorId={user._id}
          type="edit"
          data={JSON.stringify(question)}
        />
      </div>
    </div>
  );
};

export default EditQuestion;
