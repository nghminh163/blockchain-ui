import { ROW_PER_PAGE } from "../constants";

export const isMaxPage = (
  current: number = 0,
  total: number = 0,
  rowPerPage = ROW_PER_PAGE
) => {
  return current === Math.ceil(total / rowPerPage);
};
