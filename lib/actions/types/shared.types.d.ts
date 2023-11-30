export interface createQuestionProps {
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  path: string;
}

export interface getQuestionsProps {
  filter?: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}
