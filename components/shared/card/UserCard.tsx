import { IUser } from "@/database/models/user.model";
// import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import React from "react";
import RenderTags from "../root/RenderTags";
import Link from "next/link";
interface Props {
  user: IUser;
}

const tags = [
  {
    id: "1",
    name: "ReactJs",
  },
  {
    id: "2",
    name: "NextJs",
  },
  {
    id: "3",
    name: "Java",
  },
];

const UserCard = async ({ user }: Props) => {
  // const tags = await getTopInteractedTags();

  return (
    <div className="background-light900_dark200 flex h-full w-full flex-col items-center justify-center py-3">
      {/* image */}
      <Link href={"/users/" + user.id} className="my-4 w-fit">
        <Image
          src={user.picture!}
          width={200}
          height={200}
          alt="user-img"
          className="bg-circle"
        />
      </Link>
      <div className="h2-bold mt-4 flex flex-col text-center font-spaceGrotesk font-semibold">
        {user.name}
        <span className="text-dark500_light500  text-sm ">
          @{user.username}
        </span>
      </div>
      <div className="mt-4">
        <RenderTags item={tags} />
      </div>
    </div>
  );
};

export default UserCard;
