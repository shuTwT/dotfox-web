import { http } from "@/utils/http";
import type { Result, TableResult } from "../types";

/** 获取系统通知列表 */
export const getSystemNoticeList = (params?: object) => {
  return http.request<TableResult>("get", "/api/system/notice", {
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
export const editSystemNotice = (noticeId: number, data: any) => {
  return http.request<Result>("put", `/api/system/notice/${noticeId}`, {
    data
  });
};

/** 删除系统通知 */
export const removeSystemNotice = (data: number[]) => {
  return http.request<Result>("delete", "/api/system/notice", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      noticeIds: data.toString()
    }
  });
};
