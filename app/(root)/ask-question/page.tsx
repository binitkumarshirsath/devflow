import { auth } from "@clerk/nextjs";
import AskQuestion from "./AskQuestion";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const AskAQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  // const authorId = JSON.stringify(user._id);

  return (
    <div className="text-dark100_light900 flex flex-col gap-2">
      <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Ask a public question
      </div>
      <div>
        <AskQuestion authorId={user._id} />
      </div>
    </div>
  );
};

export default AskAQuestion;
