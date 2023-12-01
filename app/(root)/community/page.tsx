import UserCard from "@/components/shared/card/UserCard";
import MobileFilter from "@/components/shared/root/MobileFilter";
import SearchBar from "@/components/shared/root/SearchBar";
import { UserFilters } from "@/constants/filters";
import { IUser } from "@/database/models/user.model";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

const Community = async () => {
  const data = {};
  const users: IUser[] = await getAllUsers(data);

  return (
    <div className="text-dark100_light900 flex flex-col gap-2 ">
      <div className=" font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Community
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex items-center gap-4  max-sm:flex-col">
          <div className="w-full">
            <SearchBar
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
