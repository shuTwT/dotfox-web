import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const getFormList = (params?: object) => {
  return http.request<TableResult>("get", "/api/flowable/form", { params });
};

export const createForm = (data: object) => {
  return http.request<Result>("post", "/api/flowable/form", { data });
};

export const deployForm = (data: object) => {
  return http.request<Result>("post", "/api/flowable/add-deploy-form", { data });
};
