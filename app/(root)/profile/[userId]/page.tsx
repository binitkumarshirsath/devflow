import BadgeCard from "@/components/shared/card/BadgeCard";
import StatsCard from "@/components/shared/card/StatsCard";
import { getUserInfo } from "@/lib/actions/user.action";
import { formatDate } from "@/lib/utils";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    userId: string;
  };
}

const ProfileDetails = async ({ params: { userId } }: Props) => {
  const { userId: clerkId } = auth();
  const { user, answerCount, questionCount } = await getUserInfo({ userId });

  return (
    <div className="flex h-full w-full flex-col font-montserrat">
      <div className="flex w-full justify-between ">
        <div className="flex w-full max-md:flex-col">
          <Image
            alt="user-img"
            src={user.picture}
            width={200}
            height={200}
            className="bg-circle ml-[-2.4rem] max-h-36 text-clip rounded-full object-cover"
          />
          <div className="flex flex-col justify-end max-md:mt-4 md:ml-[-2rem]">
            <div className=" text-dark100_light900 flex flex-col font-montserrat text-3xl font-semibold text-dark-300 max-sm:text-2xl ">
              {user.name.toUpperCase()}
              <span className="mt-1 text-sm">@{user.username}</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {user.portfolioWebsite && (
                <Link
                  href={user.portfolioWebsite}
                  className="flex items-center gap-1"
                >
                  <Image
                    src={"/assets/icons/link.svg"}
                    width={20}
                    height={20}
                    alt="joined-at"
                  />
                  <div className="text-dark400_light500 text-sm ">
                    Portfolio
                  </div>
                </Link>
              )}
              {user.location && (
                <div className="flex items-center gap-1">
                  <Image
                    src={"/assets/icons/location.svg"}
                    width={20}
                    height={20}
                    alt="joined-at"
                  />
                  <div className="text-dark400_light500 text-sm ">
                    {user.location}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  width={20}
                  height={20}
                  alt="joined-at"
                />
                <div className="text-dark400_light500 text-sm ">
                  Joined {formatDate(user.joinedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="end-0 flex ">
          <SignedIn>
            {user.clerkId === clerkId && (
              <Link href={"/profile/edit/" + user._id}>
                <Button className="background-light800_dark400 px-5 py-2">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <div className="w-full flex-col">
        <div className="mt-5">
          <h3 className="text-dark500_light700 font-spaceGrotesk text-lg font-semibold">
            Stats
          </h3>
          <div className="mt-5 grid grid-cols-4 gap-2 max-md:grid-cols-2 max-xs:grid-cols-1">
            <StatsCard answer={answerCount} question={questionCount} />
            <BadgeCard medals={3} type="gold" />
            <BadgeCard medals={10} type="silver" />
            <BadgeCard medals={23} type="bronze" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
