import { http } from "@/utils/http";
import type { Result, TableResult } from "./types";

export type UserResult = Result<{
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称  */
  nickname: string;
  /** 当前登陆用户的角色 */
  roles: Array<string>;
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
}>;

export type RefreshTokenResult = Result<{
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
}>;

export type UserInfo = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 联系电话 */
  phone: string;
  /** 简介 */
  description: string;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/api/login", { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/api/refresh-token", {
    data
  });
};

/** 账户设置-个人信息 */
export const getMine = (params?: object) => {
  return http.request<Result<UserInfo>>("get", "/api/system/user/profile", {
    params
  });
};

/** 账户设置-个人安全日志 */
export const getMineLogs = (params?: object) => {
  return http.request<TableResult>("get", "/api/system/user/profile/logs", {
    params
  });
};
