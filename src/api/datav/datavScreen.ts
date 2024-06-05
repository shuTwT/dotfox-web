import { http } from "@/utils/http";
import type { Result } from "../types";

interface goviewListResult {
  code: number;
  count: number;
  data: any[];
  msg: string;
}

// * 项目列表
export const projectListApi = async (params: object) => {
  return http.request<goviewListResult>("get", "/api/goview/project/list", {
    params
  });
};

// * 新增项目
export const createProjectApi = async (data: object) => {
  return http.request<Result>("post", "/api/goview/project/create", { data });
};

// * 获取项目
export const fetchProjectApi = async (params: object) => {
  return http.request<Result>("get", "/api/goview/project/getData", { params });
};

// * 保存项目
export const saveProjectApi = async (data: object) => {
  return http.request<Result>(
    "post",
    "/api/goview/project/save/data",
    {
      data
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

// * 修改项目基础信息
export const updateProjectApi = async (data: object) => {
  return http.request<Result>("post", "/api/goview/project/edit", { data });
};

// * 删除项目
export const deleteProjectApi = async (params: object) => {
  return http.request<Result>("delete", "/api/goview/project/delete", {
    params
  });
};

// * 修改发布状态 [-1未发布,1发布]
export const changeProjectReleaseApi = async (data: object) => {
  return http.request<Result>("put", "/api/goview/project/publish", { data });
};

// * 上传文件
export const uploadFile = async (data: object) => {
  return http.request<Result>(
    "post",
    "/api/goview/project/upload",
    { data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
