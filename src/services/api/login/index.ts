import request from "../..";
import { UserInfo } from "@/views/Login/types";

/**
 * 发送验证码
 * @param {Object} data 请求参数
 * @param {string} data.email 邮箱
 */
export const reqSendCode = (data: { email: string }) =>
  request.post("/mail/send", data);

/**
 * 用户登录/注册
 * @param {Object} data
 * @param {string} data.email 邮箱
 * @param {string} [data.password] 密码
 * @param {number} [data.code] 验证码
 */
export const reqLogin = (data: {
  email: string;
  password?: string;
  code?: number;
}): Promise<{
  token: string;
  userInfo: UserInfo;
}> => request.post("/auth/login", data);
