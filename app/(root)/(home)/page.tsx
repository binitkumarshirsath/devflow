import SearchBar from "@/components/shared/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="text-dark100_light900 flex flex-col ">
        <div className="flex-between mb-6 w-full">
          <div className="h1-bold ">All Questions</div>

          <Link
            href={"/ask-question"}
            className="primary-gradient rounded-lg px-4 py-3 font-spaceGrotesk font-medium text-light-800"
          >
            Ask a question
          </Link>
        </div>
        <SearchBar placeholder="Search questions..." name="questionsSearch" />
      </div>
    </section>
  );
}
