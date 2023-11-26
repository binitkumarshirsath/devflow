import Filters from "@/components/shared/root/Filters";
import MobileFilter from "@/components/shared/root/MobileFilter";
import SearchBar from "@/components/shared/root/SearchBar";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="text-dark100_light900 flex flex-col gap-2 ">
        <div className="flex-between mb-6 w-full">
          <div className="h1-bold ">All Questions</div>

          <Link
            href={"/ask-question"}
            className="primary-gradient rounded-lg px-4 py-3 font-spaceGrotesk font-medium text-light-800"
          >
            Ask a question
          </Link>
        </div>
        <SearchBar
          placeholder="Search questions..."
          name="questionsSearch"
          classList=""
        />
        {/* Filters for tab and small devices */}
        <MobileFilter filters={HomePageFilters} />
        <Filters filters={HomePageFilters} />
      </div>
    </section>
  );
}
