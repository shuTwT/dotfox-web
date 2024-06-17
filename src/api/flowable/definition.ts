import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const getDefinitionList = (params?: object) => {
  return http.request<TableResult>("get", "/api/flowable/definition", {
    params
  });
};

export const createDefinition = (data: object) => {
  return http.request<Result>("post", "/api/flowable/definition", { data });
};

export const updateDefinition = (id: string, data: object) => {
  return http.request<Result>("put", "/api/flowable/definition/" + id, {
    data
  });
};

export const deleteDefinition = (id: number) => {
  return http.request<Result>("delete", "/api/flowable/definition/" + id);
};
