import MobileFilter from "@/components/shared/root/MobileFilter";
import NoResults from "@/components/shared/root/NoResults";
import Questions from "@/components/shared/root/Questions";
import SearchBar from "@/components/shared/root/SearchBar";
import { QuestionFilters } from "@/constants/filters";
import { getUserSavedQuestions } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";
import console from "console";
import React from "react";

interface Props {
  searchParams: {
    q: string;
  };
}

const Collections = async ({ searchParams: { q } }: Props) => {
  const { userId } = auth();

  const questions = await getUserSavedQuestions({
    clerkId: userId!,
    searchQuery: q,
  });
  console.log(questions);

  return (
    <div className="text-dark100_light900  flex w-full flex-col gap-2 ">
      <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Saved Questions
      </div>
      <div className="mt-3 flex items-center gap-4  max-sm:flex-col">
        <div className="w-full">
          <SearchBar
            route="/collections"
            name="users"
            placeholder="Search saved questions here..."
            classList="max-h-12 text-sm font-montserrat font-base"
          />
        </div>
        <div className="w-full">
          <MobileFilter filters={QuestionFilters} visible={true} />
        </div>
      </div>
      {questions && questions.length === 0 ? (
        <NoResults
          title="No saved questions found!"
          description="Save your first question 💡 ,
          Elevate your coding journey! Start saving your burning questions now on our devFlow  for expert advice and collaborative problem-solving."
          button={{
            href: "/",
            label: "Lets Save !",
            classList: "px-5 py-2 mt-5",
          }}
        />
      ) : (
        <Questions questions={questions} />
      )}
    </div>
  );
};

export default Collections;
