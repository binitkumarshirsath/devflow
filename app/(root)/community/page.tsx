import UserCard from "@/components/shared/card/UserCard";
import MobileFilter from "@/components/shared/root/MobileFilter";
import NoResults from "@/components/shared/root/NoResults";
import SearchBar from "@/components/shared/root/SearchBar";
import { UserFilters } from "@/constants/filters";
import { IUser } from "@/database/models/user.model";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

interface Props {
  searchParams: {
    q: string;
    filter: string;
  };
}

const Community = async ({ searchParams: { q, filter } }: Props) => {
  const users: IUser[] = await getAllUsers({
    searchQuery: q,
    filter,
  });

  return (
    <div className="text-dark100_light900 flex flex-col gap-2 ">
      <div className=" font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Community
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex items-center gap-4  max-sm:flex-col">
          <div className="w-full">
            <SearchBar
              route="/community"
              name="users"
              placeholder="Search amazing minds here..."
              classList="max-h-12 text-sm font-montserrat font-base"
            />
          </div>
          <div className="w-full">
            <MobileFilter filters={UserFilters} visible={true} />
          </div>
        </div>

        {/* Render users */}

        {users.length === 0 && (
          <NoResults
            title="No users found ! Be the first to register 🚀"
            description="Be the first one to be part of this great community!"
            button={{
              label: "Sign-up",
              alt: "signup",
              classList: "mt-5 ",
              href: "sign-up",
            }}
          />
        )}
        <div className="mt-10 grid gap-4 sm:mt-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3  ">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
