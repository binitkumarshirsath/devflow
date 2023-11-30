import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// dateUtils.js

export function formatDate(date: string) {
  const now = moment();
  const createdDate = moment(date);

  const duration = moment.duration(now.diff(createdDate));

  if (duration.asDays() > 1) {
    return `${Math.floor(duration.asDays())} days ago`;
  } else if (duration.asHours() > 1) {
    return `${Math.floor(duration.asHours())} hours ago`;
  } else if (duration.asMinutes() > 1) {
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  } else {
    return `${Math.floor(duration.asSeconds())} seconds ago`;
  }
}
