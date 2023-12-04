import Image from "next/image";
import React from "react";
interface Props {
  medals: number;
  type: "gold" | "silver" | "bronze";
}

const BadgeCard = ({ medals = 0, type }: Props) => {
  const src =
    type === "gold"
      ? "/assets/icons/gold-medal.svg"
      : type === "silver"
        ? "/assets/icons/silver-medal.svg"
        : "/assets/icons/bronze-medal.svg";
  const badges =
    type === "gold"
      ? "Gold badges"
      : type === "silver"
        ? "Silver badges"
        : "Bronze badges";
  return (
    <div className="background-light900_dark200 flex h-full w-full justify-center gap-2 p-8">
      <Image src={src} alt="medal" width={30} height={30} />
      <div className="flex flex-col justify-center max-sm:whitespace-nowrap">
        <div>
          {medals} {badges}
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
