import { Pagination } from "@types-app/general";

const createPagination = (
  page: number,
  quantity: number,
  limit: number,
): Pagination => {
  const totalEntries = quantity;
  const totalPages = Math.ceil(quantity / limit);
  const offset = (page - 1) * limit;
  const hasNextPage = totalPages - page > 0;
  const nextPage = hasNextPage ? page + 1 : null;

  return {
    page,
    totalPages,
    totalEntries,
    offset,
    hasNextPage,
    nextPage,
  };
};

export default createPagination;
