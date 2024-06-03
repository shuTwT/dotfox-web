import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

/** 获取系统管理-角色管理列表 */
export const getRoleList = (params?: object) => {
  return http.request<TableResult>("get", "/api/system/role", { params });
};

export const addRole = (data: object) => {
  return http.request<Result>("post", "/api/system/role", { data });
};

export const editRole = (id: number, data: object) => {
  return http.request<Result>("put", "/api/system/role/" + id, { data });
};

export const removeRole = (id: number) => {
  return http.request<Result>("put", "/api/system/role/" + id);
};
