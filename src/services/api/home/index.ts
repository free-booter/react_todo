import { TaskStatus, Todo, TodoBase } from "@/types/task";
import request from "../..";
import { Calendar, StatisticCounts, TodoListReq, TodoListRes } from "./type";

/**
 * 获取待办列表
 * @param data 请求参数
 * @returns 待办列表
 */
export const reqTodoList = (data: TodoListReq): Promise<TodoListRes> =>
  request.post<TodoListRes>("/task/list", data);

/**
 * 获取3种类别代办列表
 * @param data
 * @returns
 */
export const reqTodoListAll = (data?: TodoListReq): Promise<TodoListRes[]> =>
  request.post("/task/list/all", data);

/**
 * 删除待办
 * @param data 请求参数
 * @param data.id 待办id
 * @returns 删除结果
 */
export const reqDeleteTodo = (data: { id: number }): Promise<any> =>
  request.delete<any>("/task/delete", { params: data });

/**
 * 获取待办详情
 * @param id 待办id
 * @returns 待办详情
 */
export const reqTodoDetail = (id: number): Promise<Todo> =>
  request.get<Todo>(`/task/detail/${id}`);

/**
 * 编辑待办
 * @param data 待办数据
 * @returns 编辑结果
 */
export const reqUpdateTodo = (data: Todo): Promise<any> =>
  request.put<any>("/task/update", data);

/**
 * 添加代办
 * @param data
 * @returns
 */
export const reqAddTodo = (data: TodoBase): Promise<any> =>
  request.post<any>("/task/create", data);

/**
 * 更新待办状态
 * @param data
 * @param data.id 待办id
 * @param data.status 待办状态
 * @returns
 */
export const reqUpdateTodoStatus = (data: {
  id: number;
  status: TaskStatus;
}): Promise<any> => request.put<any>("/task/updateStatus", data);

/**
 * 添加标签
 * @param data
 * @param data.name 标签名称
 * @returns
 */
export const reqAddTag = (data: { name: string }): Promise<any> =>
  request.post<any>("/tag/create", data);

/**
 * 获取标签列表
 * @returns
 */
export const reqTagList = (): Promise<any> => request.get<any>("/tag/list");

/**
 * 删除标签
 * @param data
 * @param data.id 标签id
 * @returns
 */
export const reqDeleteTag = (data: { id: number }): Promise<any> =>
  request.delete<any>("/tag/delete", { params: data });

/**
 * 更新标签
 * @param data
 * @param data.id 标签id
 * @param data.name 标签名称
 * @returns
 */
export const reqUpdateTag = (data: {
  id: number;
  name: string;
}): Promise<any> => request.put<any>("/tag/update", data);

/**
 * 获取任务统计数据
 * @returns
 */
export const reqTaskCounts = (): Promise<StatisticCounts> =>
  request.get("/task/counts");

/**
 * 按日期范围/月份获取日历事件
 * @param data
 * @returns
 */
export const reqTaskCalender = (params: {
  startDate?: string;
  endDate?: string;
  month?: string;
}): Promise<Calendar> => request.get("/task/calendar", { params });

/**
 * 更新任务顺序
 * @param data
 * @param data.taskId 拖拽的任务id
 * @param data.dropId 目标位置任务的id
 * @param data.dropStatus 目标位置任务的状态
 * @returns
 */
export const reqUpdateTaskOrder = (data: {
  taskId: number;
  dropId?: number;
  dropStatus: Todo["status"];
}) => request.patch(`/task/${data.taskId}/order`, data);
