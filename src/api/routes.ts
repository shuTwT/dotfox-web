import { http } from "@/utils/http";
import type { ArrayResult } from "./types";

export const getAsyncRoutes = () => {
  return http.request<ArrayResult>("get", "/api/get-async-routes");
};
