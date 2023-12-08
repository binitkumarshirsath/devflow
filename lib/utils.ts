import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// dateUtils.js

export function formatDate(date: Date | string) {
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

// form url
interface FormUrlParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: FormUrlParams) {
  const currentURL = qs.parse(params);

  currentURL[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentURL,
    },
    { skipNull: true }
  );
}

interface ClearUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export function clearUrlQuery({ params, keysToRemove }: ClearUrlQueryParams) {
  const currentURL = qs.parse(params);

  keysToRemove.forEach((key) => delete currentURL[key]);

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentURL,
    },
    {
      skipNull: true,
    }
  );
}
