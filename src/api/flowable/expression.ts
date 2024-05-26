import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const getExpressionList = (params?: object) => {
  return http.request<TableResult>("get", "/api/flowable/expression", { params });
};

// export const createExpression = (data: object) => {
//   return http.request<Result>("post", "/api/flowable/form", { data });
// };
