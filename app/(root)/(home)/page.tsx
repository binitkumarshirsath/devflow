import CTAButton from "@/components/shared/root/CTAButton";
import Filters from "@/components/shared/root/Filters";
import MobileFilter from "@/components/shared/root/MobileFilter";
import SearchBar from "@/components/shared/root/SearchBar";
import { HomePageFilters } from "@/constants/filters";

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
      </div>
    </section>
  );
}
