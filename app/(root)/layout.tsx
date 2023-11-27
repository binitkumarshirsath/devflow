import LeftSideBar from "@/components/shared/root/LeftSideBar";
import RightSideBar from "@/components/shared/root/RightSideBar";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";
/*
 This layout acts as a children to the layout file with same level as (root)
*/

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <main className="background-light850_dark100 relative flex flex-col">
      <Navbar />
      <div className=" flex flex-row justify-between">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-32 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        <RightSideBar />
      </div>
    </main>
  );
};

export default RootLayout;
