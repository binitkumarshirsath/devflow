import { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}
export interface Filter {
  value: string;
  name: string;
}

export interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}
export interface Country {
  name: {
    common: string;
  };
}
export interface ParamsProps {
  params: { id: string };
}
export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}
export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export interface TagProps {
  id: string;
  name: string;
}

export interface UserProps {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  picture: string;
}

export interface QuestionProps {
  _id: string;
  title: string;
  content: string;
  tags: TagProps[];
  createdAt: Date;
  author: {
    _id: string;
    name: string;
    clerkId: string;
    picture: string;
  };
  answers: string[];
  views: number;
  upvotes: string[];
  downvotes: string[];
  author: UserProps;
}

export interface AnswerProps {
  _id: string;
  content: string;
  createdAt: Date;
  author: {
    _id: string;
    name: string;
    clerkId: string;
    picture: string;
  };
  question: QuestionProps;
  upvotes: [string];
  downvotes: [string];
}
