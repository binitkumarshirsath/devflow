import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Questions from "./Questions";
import NoResults from "./NoResults";
import { AnswerProps, QuestionProps } from "@/types";
import Answer from "./Answers";

const TabView = ({
  questions,
  answers,
}: {
  questions: QuestionProps[];
  answers: AnswerProps[];
}) => {
  return (
    <Tabs defaultValue="top-posts" className="">
      <TabsList>
        <TabsTrigger value="top-posts" className="">
          Top Posts
        </TabsTrigger>
        <TabsTrigger value="answers" className="">
          Answers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="top-posts">
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
      </TabsContent>
      <TabsContent value="answers">
        {answers && answers.length === 0 ? (
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
          <Answer answers={answers} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TabView;
