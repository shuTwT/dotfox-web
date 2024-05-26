import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const getDefinitionList = (params?: object) => {
  return http.request<TableResult>("get", "/api/flowable/definition", { params });
};

export const createDefinition = (data: object) => {
  return http.request<Result>("post", "/api/flowable/definition", { data });
};
