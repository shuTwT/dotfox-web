import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

/** 获取系统管理-部门管理列表 */
export const getDeptList = (params?: object) => {
  return http.request<TableResult>("get", "/api/system/dept", { params });
};

export const addDept = (data: object) => {
  return http.request<Result>("post", "/api/system/dept", { data });
};

export const editDept = (id: number, data: object) => {
  return http.request<Result>("put", "/api/system/dept/" + id, { data });
};

export const removeDept = (id: number) => {
  return http.request<Result>("put", "/api/system/dept/" + id);
};
