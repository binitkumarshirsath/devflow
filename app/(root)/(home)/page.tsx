import CTAButton from "@/components/shared/root/CTAButton";
import Filters from "@/components/shared/root/Filters";
import MobileFilter from "@/components/shared/root/MobileFilter";
import NoResults from "@/components/shared/root/NoResults";
import Questions from "@/components/shared/root/Questions";
import SearchBar from "@/components/shared/root/SearchBar";
import { HomePageFilters } from "@/constants/filters";

interface QuestionProps {
  id: number;
  title: string;
  tags: {
    id: number;
    name: string;
  }[];
  authorName: string;
  createdAt: Date;
  votes: number;
  views: number;
  answers: number;
}
const questions = [];
// const questions: QuestionProps[] = [
//   {
//     id: 1,
//     title: "How to use TypeScript with React?",
//     tags: [
//       { id: 101, name: "TypeScript" },
//       { id: 102, name: "React" },
//     ],
//     authorName: "John Doe",
//     createdAt: new Date("2023-01-01T12:00:00Z"),
//     votes: 15,
//     views: 200,
//     answers: 3,
//   },
//   {
//     id: 2,
//     title: "Best practices for REST API design?",
//     tags: [
//       { id: 103, name: "API Design" },
//       { id: 104, name: "Best Practices" },
//     ],
//     authorName: "Jane Smith",
//     createdAt: new Date("2023-02-05T14:30:00Z"),
//     votes: 23,
//     views: 150,
//     answers: 5,
//   },
//   {
//     id: 3,
//     title: "How to optimize performance in Angular apps?",
//     tags: [
//       { id: 105, name: "Angular" },
//       { id: 106, name: "Performance" },
//     ],
//     authorName: "Alex Johnson",
//     createdAt: new Date("2023-03-10T09:45:00Z"),
//     votes: 30,
//     views: 300,
//     answers: 8,
//   },
//   // Add more questions as needed
// ];

export default function Home() {
  return (
    <section>
      <div className="text-dark100_light900 flex flex-col gap-2 ">
        <div className="flex-between mb-6 w-full">
          <div className="font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
            All Questions
          </div>
          <CTAButton href="/ask-question" label="Ask a question" />
        </div>
        <div className="mt-5 flex h-full w-full max-md:items-center max-md:gap-8 md:flex-col ">
          <SearchBar
            placeholder="Search questions..."
            name="questionsSearch"
            classList=""
          />
          {/* Filters for tab and small devices */}
          <MobileFilter filters={HomePageFilters} />
          <Filters filters={HomePageFilters} />
        </div>
        {/* Question cards */}
        {questions && questions.length === 0 ? <NoResults /> : <Questions />}
      </div>
    </section>
  );
}
