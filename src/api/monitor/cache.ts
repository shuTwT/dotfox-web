import { http } from "@/utils/http";
import type { Result } from "../types";

export const getCache = (params?: object) => {
  return http.request<Result>("get", "/api/monitor/cache/info", { params });
};
