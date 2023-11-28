import Image from "next/image";
import Link from "next/link";

import React from "react";

export interface CTAButtonProps {
  label: string;
  href?: string;
  classList?: string;
  src?: string;
  size?: number;
  alt?: string;
  type?: string;
}

const CTAButton = ({
  classList,
  label,
  href,
  src,
  alt,
  size,
  type,
}: CTAButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={` ${classList} primary-gradient flex w-fit gap-2 rounded-lg px-4 py-3 font-spaceGrotesk font-medium text-light-800 max-sm:font-light`}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type as "button" | "submit" | "reset" | undefined}
      className={` ${classList} primary-gradient flex w-fit gap-2 rounded-lg px-4 py-3 font-spaceGrotesk font-medium text-light-800 max-sm:font-light`}
    >
      {label}
      {src && (
        <Image
          src={src}
          width={size || 20}
          height={size || 20}
          alt={alt || "alt"}
        />
      )}
    </button>
  );
};

export default CTAButton;
