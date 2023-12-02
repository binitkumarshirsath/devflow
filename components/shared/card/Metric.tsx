import { formatDate } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/*
if we pass href , it means its the right bottom part of card,
so we need to show created at too and make the div as a link ie clickable
*/

interface Props {
  src: string;
  alt: string;
  size: number;
  label: string;
  createdAt?: string;
  href?: string;
  count?: number | string;
}

const Metric = ({ alt, createdAt, label, size, src, href, count }: Props) => {
  if (href) {
    return (
      <Link href={href} className="flex gap-2">
        <Image alt={alt} src={src} width={size || 20} height={size} />
        <div className="flex gap-2">
          {label}
          {createdAt && (
            <span className="max-sm:hidden">{formatDate(createdAt)}</span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1 font-spaceGrotesk text-xs">
      <Image alt={alt} src={src} width={size || 20} height={size} />
      <div className="">
        {count} <span className="">{label}</span>
      </div>
    </div>
  );
};

export default Metric;
