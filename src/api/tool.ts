import { http } from "@/utils/http";
import type { Result, TableResult } from "./types";

export const getGenList = (params?: object) => {
  return http.request<TableResult>("get", "/api/tool/gen", { params });
};

export const getDbList = (params?: object) => {
  return http.request<TableResult>("get", "/api/tool/gen/db", { params });
};

export const getGenTable = (tableId: number) => {
  return http.request<Result>("get", "/api/tool/gen/" + tableId);
};

export const updateGenTable = (data: object) => {
  return http.request<Result>("put", "/api/tool/gen", { data });
};

export const importTable = (data: object) => {
  return http.request<Result>("post", "/api/tool/gen/import-table", { data });
};

export const createTable = (data: object) => {
  return http.request<Result>("post", "/api/tool/gen/createTable", { data });
};

export const previewTable = (tableId: number) => {
  return http.request<Result>("get", "/api/tool/gen/" + tableId);
};

export const delTable = (tableId: number) => {
  return http.request<Result>("delete", "/api/tool/gen/" + tableId);
};

export const genCode = (tableName: string) => {
  return http.request<Result>("get", "/api/tool/gen/gen-code/" + tableName);
};

export const syncDb = (tableName: string) => {
  return http.request<Result>("get", "/api/tool/gen/sync-db/" + tableName);
};
