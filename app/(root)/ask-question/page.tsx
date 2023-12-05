import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import QuestionForm from "@/components/form/QuestionForm";

const AskAQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  return (
    <div className="text-dark100_light900 flex flex-col gap-2">
      <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Ask a public question
      </div>
      <div>
        <QuestionForm authorId={user._id} type="create" />
      </div>
    </div>
  );
};

export default AskAQuestion;
