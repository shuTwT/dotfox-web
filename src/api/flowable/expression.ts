import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const getExpressionList = (params?: object) => {
  return http.request<TableResult>("get", "/api/flowable/expression", {
    params
  });
};

export const addExpression = (data: object) => {
  return http.request<Result>("post", "/api/flowable/expression", { data });
};

export const editExpression = (id: number, data: object) => {
  return http.request<Result>("put", "/api/flowable/expression/" + id, {
    data
  });
};

export const removeExpression = (id: number) => {
  return http.request<Result>("put", "/api/flowable/expression/" + id);
};
