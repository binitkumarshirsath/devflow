import EditProfile from "@/components/form/EditProfile";
import { getUserById } from "@/lib/actions/user.action";
import { UserProps } from "@/types";
import { auth } from "@clerk/nextjs";

import React from "react";

const EditUserProfile = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const user: UserProps = await getUserById(userId);

  return (
    <div className="text-dark100_light900  flex w-full flex-col gap-2 ">
      <div className="mb-5 font-montserrat text-3xl font-semibold text-dark-300 dark:text-light-700 max-sm:text-2xl ">
        Edit Profile
      </div>
      <EditProfile data={JSON.stringify(user)} />
    </div>
  );
};

export default EditUserProfile;
