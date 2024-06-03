import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const formList = (params?: object) => {
  return http.request<TableResult>("get", "/api/flowable/form", { params });
};

export const addForm = (data: object) => {
  return http.request<Result>("post", "/api/flowable/form", { data });
};

export const updateForm = (id: number|string,data: object) => {
  return http.request<Result>("put", "/api/flowable/form/"+id, { data });
};

export const removeForm = (id: number) => {
  return http.request<Result>("delete", "/api/flowable/form/"+id);
};

export const deployForm = (data: object) => {
  return http.request<Result>("post", "/api/flowable/add-deploy-form", { data });
};
