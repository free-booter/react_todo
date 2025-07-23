import request from "../..";
import { TodoDetail, TodoListReq, TodoListRes } from "./type";

/**
 * 获取待办列表
 * @param data 请求参数
 * @returns 待办列表
 */
export const reqTodoList = (data: TodoListReq): Promise<TodoListRes> =>
  request.post<TodoListRes>("/task/list", data);

/**
 * 删除待办
 * @param data 请求参数
 * @param data.id 待办id
 * @returns 删除结果
 */
export const deleteTodo = (data: { id: number }): Promise<any> =>
  request.delete<any>("/task/delete", { params: data });

/**
 * 获取待办详情
 * @param id 待办id
 * @returns 待办详情
 */
export const reqTodoDetail = (id: number): Promise<TodoDetail> =>
  request.get<TodoDetail>(`/task/detail/${id}`);

/**
 * 编辑待办
 * @param data 待办数据
 * @returns 编辑结果
 */
export const reqUpdateTodo = (data: TodoDetail): Promise<any> =>
  request.put<any>("/task/update", data);

/**
 * 添加代办
 * @param data
 * @returns
 */
export const reqAddTodo = (data: TodoDetail): Promise<any> =>
  request.post<any>("/task/add", data);
