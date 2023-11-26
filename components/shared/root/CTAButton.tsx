import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  href: string;
  classList?: string;
}

const CTAButton = ({ classList, label, href }: Props) => {
  return (
    <Link
      href={href}
      className={`primary-gradient rounded-lg px-4 py-3 font-spaceGrotesk font-medium text-light-800 max-sm:font-light ${classList}`}
    >
      {label}
    </Link>
  );
};

export default CTAButton;
