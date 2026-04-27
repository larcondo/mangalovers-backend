export interface SearchArgs {
  query: string;
}

export interface Pagination {
  page: number;
  totalPages: number;
  totalEntries: number;
  offset: number;
  hasNextPage: boolean;
  nextPage: number | null;
}
