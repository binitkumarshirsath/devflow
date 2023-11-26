import Image from "next/image";
import React from "react";
import CTAButton from "./CTAButton";

const NoResults = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center lg:mt-10">
      <Image
        src={"/assets/images/light-illustration.png"}
        height={300}
        width={280}
        alt="No results found"
        className="dark:hidden"
      />
      <Image
        src={"/assets/images/dark-illustration.png"}
        height={300}
        width={280}
        alt="No results found"
        className="hidden dark:flex "
      />
      <h1 className="h2-semibold my-5">There are not question to show!</h1>
      <p className=" w-9/12  text-center font-montserrat text-sm">
        Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡
      </p>
      <CTAButton href="/ask-question" label="Lets Go !" classList="px-7 mt-4" />
    </div>
  );
};

export default NoResults;
