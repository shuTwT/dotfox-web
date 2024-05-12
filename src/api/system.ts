import { http } from "@/utils/http";
import type { Result, ServerInfo, TableResult } from "./types";

/** 获取系统管理-用户管理列表 */
export const getUserList = (params?: object) => {
  return http.request<TableResult>("get", "/api/system/user", { params });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get", "/api/system/list-all-role");
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", "/api/system/list-role-ids", { data });
};

/** 获取系统管理-角色管理列表 */
export const getRoleList = (params?: object) => {
  return http.request<TableResult>("get", "/api/system/role", { params });
};

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (params?: object) => {
  return http.request<Result>("get", "/api/system/menu", { params });
};

export const getMenuTreeSelect = () => {
  return http.request<Result>("get", "/api/system/menu/tree-select");
};

/** 新增系统管理-菜单 */
export const addMenu = (data?: object) => {
  return http.request<Result>("post", "/api/system/menu", { data });
};

/** 更新系统管理-菜单 */
export const updateMenu = (menuId?: number, data?: object) => {
  return http.request<Result>("put", "/api/system/menu/" + menuId, { data });
};

/** 删除系统管理-菜单 */
export const deleteMenu = (menuId?: number) => {
  return http.request<Result>("delete", "/api/system/menu/" + menuId);
};

/** 获取系统管理-部门管理列表 */
export const getDeptList = (params?: object) => {
  return http.request<Result>("get", "/api/system/dept", { params });
};

/** 获取系统监控-在线用户列表 */
export const getOnlineLogsList = (params?: object) => {
  return http.request<TableResult>("get", "/api/monitor/online-logs", {
    params
  });
};

export const offlineUser = (id: string, data?: object) => {
  return http.request<Result>("delete", "/api/monitor/offline/" + id, { data });
};

/** 获取系统监控-登录日志列表 */
export const getLoginLogsList = (data?: object) => {
  return http.request<TableResult>("post", "/api/monitor/login-logs", { data });
};

/** 获取系统监控-操作日志列表 */
export const getOperationLogsList = (data?: object) => {
  return http.request<TableResult>("post", "/api/monitor/operation-logs", {
    data
  });
};

/** 获取系统监控-系统日志列表 */
export const getSystemLogsList = (data?: object) => {
  return http.request<TableResult>("post", "/api/monitor/system-logs", {
    data
  });
};

/** 获取系统监控-系统日志-根据 id 查日志详情 */
export const getSystemLogsDetail = (data?: object) => {
  return http.request<Result>("post", "/api/monitor/system-logs-detail", {
    data
  });
};

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (params?: object) => {
  return http.request<Result>("get", "/api/system/role-menu", { params });
};

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>("post", "/api/system/role-menu-ids", { data });
};

/** 获取系统通知列表 */
export const getSystemNoticeList = (params?: object) => {
  return http.request<Result>("get", "/api/system/notice", {
    params
  });
};

/** 添加系统通知 */
export const addSystemNotice = (data: object) => {
  return http.request<Result>("post", "/api/system/notice", {
    data
  });
};

/** 修改系统通知 */
export const updateSystemNotice = (noticeId: number, data: any) => {
  return http.request<Result>("put", `/api/system/notice/${noticeId}`, {
    data
  });
};

/** 删除系统通知 */
export const deleteSystemNotice = (data: number[]) => {
  return http.request<Result>("delete", "/api/system/notice", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      noticeIds: data.toString()
    }
  });
};

export const getSystemDictTypeList = (params: object) => {
  return http.request<Result>("get", "/api/system/dict/type", {
    params
  });
};

export const getSystemDictType = (dictId: number) => {
  return http.request<Result>("get", "/api/system/dict/type/" + dictId);
};

export const addSystemDictType = (data: object) => {
  return http.request<Result>("post", "/api/system/dict/type/", { data });
};

export const updateSystemDictType = (dictId: number, data: object) => {
  return http.request<Result>("put", "/api/system/dict/type/" + dictId, {
    data
  });
};

export const deleteSystemDictType = (data: number[]) => {
  return http.request<Result>("delete", "/api/system/dict/type/", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      dictIds: data.toString()
    }
  });
};

export const refreshSystemDictCache = () => {
  return http.request<Result>("delete", "/api/system/dict/type/refresh-cache");
};

export const getDictOptionSelect = () => {
  return http.request<Result>("get", "/api/system/dict/type/optionselect");
};

export const getSystemDictDataList = (params: object) => {
  return http.request<Result>("get", "/api/system/dict/data", {
    params
  });
};

export const getSystemDictData = (dictCode: number) => {
  return http.request<Result>("get", "/api/system/dict/data/" + dictCode);
};

export const addSystemDictData = (data: object) => {
  return http.request<Result>("post", "/api/system/dict/data", { data });
};

export const updateSystemDictData = (dictCode: number, data: object) => {
  return http.request<Result>("put", "/api/system/dict/data/" + dictCode, {
    data
  });
};

export const deleteSystemDictData = (data: number[]) => {
  return http.request<Result>("delete", "/api/system/dict/data/", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      dictCodes: data.toString()
    }
  });
};

/** 获取服务器信息 */
export const getServerInfoApi = () => {
  return http.request<Result<ServerInfo>>("get", "/api/monitor/serverInfo");
};

/** 获取Redis信息 */
export const getCacheInfoApi = () => {
  return http.request<Result<ServerInfo>>("get", "/api/monitor/cacheInfo");
};

export const getSystemConfigList = (params: object) => {
  return http.request<Result>("get", "/api/system/config", { params });
};

export const getSystemConfigDetail = (configId: number) => {
  return http.request<Result>("get", "/api/system/config/" + configId);
};

export const addSystemConfig = (data: object) => {
  return http.request<Result>("post", "/api/system/config", { data });
};

export const updateSystemConfig = (configId: number, data: object) => {
  return http.request<Result>("put", "/api/system/config/" + configId, {
    data
  });
};

export const deleteSystemConfig = (configId: number[]) => {
  return http.request<Result>("delete", "/api/system/config/" + configId);
};

export const refreshSystemConfig = () => {
  return http.request<Result>("post", "/api/system/config/refresh-cache");
};

/** 文件上传 */
export const formUpload = (data: FormData) => {
  return http.request<Result>(
    "post",
    "/api/upload",
    { data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
