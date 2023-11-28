import Image from "next/image";
import Link from "next/link";
import React from "react";

const topQuestionsData = [
  {
    id: 1,
    que: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    id: 2,
    que: "Can i get a course for free?",
  },
  {
    id: 3,
    que: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    id: 4,
    que: "Redux toolkit not updating as expected?",
  },
  {
    id: 5,
    que: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
];

const tags = [
  {
    tag: "nextjs",
    count: 35,
  },
  {
    tag: "reactjs",
    count: 10,
  },
  {
    tag: "html",
    count: 15,
  },
  {
    tag: "css",
    count: 20,
  },
];

const RightSideBar = () => {
  return (
    <aside className="background-light900_dark200 no-scrollbar sticky right-0  top-0 h-screen overflow-y-auto px-4 max-xl:hidden xl:w-[325px]">
      <div className="mt-32 px-3 py-4">
        <h1 className="h3-bold  font-spaceGrotesk">Top Questions</h1>

        <div className="flex flex-col gap-5 py-5  font-montserrat text-sm">
          {topQuestionsData.map(({ que, id }) => (
            <Link
              href={que}
              className="flex items-center justify-between"
              key={id}
            >
              <p className="font-inter text-sm tracking-tighter dark:text-light-800">
                {que}
              </p>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                width={20}
                height={20}
                alt="goto question"
                className="invert-colors"
              />
            </Link>
          ))}

          <div>
            <h1 className="h3-bold my-6  font-spaceGrotesk">Popular Tags</h1>
            {tags.map(({ tag, count }, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 "
                >
                  <div className="rounded-sm bg-light-800 px-3 py-2 font-montserrat text-sm text-light-400 dark:bg-dark-300 dark:text-light-500">
                    {tag}
                  </div>
                  <div>{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
