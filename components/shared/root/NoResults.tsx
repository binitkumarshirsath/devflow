import Image from "next/image";
import React from "react";
import CTAButton, { CTAButtonProps } from "./CTAButton";

interface Props {
  title: string;
  description: string;
  button: CTAButtonProps;
}

const NoResults = ({
  title,
  description,
  button: { href, label, classList },
}: Props) => {
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
      <h1 className="h2-semibold my-5">{title}</h1>
      <p className=" w-9/12  text-center font-montserrat text-sm">
        {description}
      </p>
      <CTAButton href={href} label={label} classList={classList} />
    </div>
  );
};

export default NoResults;
