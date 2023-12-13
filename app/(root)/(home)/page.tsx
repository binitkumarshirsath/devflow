import CTAButton from "@/components/shared/root/CTAButton";
import Filters from "@/components/shared/root/Filters";
import MobileFilter from "@/components/shared/root/MobileFilter";
import NoResults from "@/components/shared/root/NoResults";
import Pagination from "@/components/shared/root/Pagination";

import Questions from "@/components/shared/root/Questions";
import SearchBar from "@/components/shared/root/SearchBar";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { QuestionProps } from "@/types";

interface Props {
  searchParams: {
    q: string;
    filter: string;
    page: string;
  };
}

export default async function Home({
  searchParams: { q, filter, page },
}: Props) {
  const result = await getQuestions({
    searchQuery: q,
    filter,
    page: page ? +page : 1,
  });
  const questions: QuestionProps[] = (result?.questions ||
    []) as QuestionProps[];

  return (
    <>
      <div className="text-dark100_light900  flex w-full flex-col gap-2 ">
        <div className="flex-between mb-6 w-full">
          <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
            All Questions
          </div>
          <CTAButton href="/ask-question" label="Ask a question" />
        </div>
        <div className="mt-5 flex h-full w-full gap-6 max-md:items-center max-md:gap-4 lg:flex-col ">
          <SearchBar
            placeholder="Search questions..."
            name="questionsSearch"
            classList=""
            route="/"
          />
          {/* Filters for tab and small devices */}
          <MobileFilter filters={HomePageFilters} />
          <Filters filters={HomePageFilters} />
        </div>
        {/* Question cards */}
        {questions && questions.length === 0 ? (
          <NoResults
            title="No questions found!"
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
        <Pagination
          page={page ? +page : 1}
          hasNext={result?.hasNext || false}
        />
      </div>
    </>
  );
}
