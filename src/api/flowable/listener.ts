import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

export const getListenerList = (params?: object) => {
  return http.request<TableResult>("get", "/api/flowable/listener", { params });
};

export const createListener = (data: object) => {
  return http.request<Result>("post", "/api/flowable/listener", { data });
};
