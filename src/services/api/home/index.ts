import request from "../..";
import { TodoListReq, TodoListRes } from "./type";

/**
 * 获取待办列表
 * @param data 请求参数
 * @returns 待办列表
 */
export const reqTodoList = (data: TodoListReq) =>
  request.get<TodoListRes>("/todo/list", data);
