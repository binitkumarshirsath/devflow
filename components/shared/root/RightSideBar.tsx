import { getHotQuestions } from "@/lib/actions/question.action";
import { getHotTags } from "@/lib/actions/tag.action";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const RightSideBar = async () => {
  const topQuestionsData = await getHotQuestions();
  const topTags = await getHotTags();

  return (
    <aside className="  background-light900_dark200 no-scrollbar sticky right-0  top-0 h-screen overflow-y-auto px-4 max-xl:hidden xl:w-[325px]">
      <div className="mt-32 px-3 py-4">
        <h1 className="h3-bold  font-spaceGrotesk">Top Questions</h1>

        <div className="flex flex-col gap-5 py-5  font-montserrat text-sm">
          {topQuestionsData.map((que, id) => (
            <Link
              href={"question/" + que._id}
              className="flex items-center justify-between gap-2"
              key={id}
            >
              <p className="font-inter text-sm tracking-tighter dark:text-light-800">
                {que.title}
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
            {topTags.map((tag, index) => {
              return (
                <Link
                  href={"/tags/" + tag._id}
                  key={index}
                  className="flex items-center justify-between py-4 pr-5 "
                >
                  <div className="rounded-sm bg-light-800 px-3 py-2 font-montserrat text-sm text-light-400 dark:bg-dark-300 dark:text-light-500">
                    {tag.name}
                  </div>
                  <div>{tag.questionCount}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
