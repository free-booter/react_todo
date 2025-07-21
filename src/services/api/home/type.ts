import { BasePageReq, BasePageRes } from "@/services/types";

export type TodoListItem = {
  id: number;
  title: string;
  description?: string;
  status: number;
  priority: number;
  createTime: string;
  tagIds: Array<number>;
  date: string;
  dateType: number;
  startDate: string;
  endDate: string;
  specificTime: string;
  userId: number;
  remindType: number;
  repeatType: number;
  advanceType: number;
  advanceValue: number;
};

export interface TodoListRes extends BasePageRes<TodoListItem> {}

export interface TodoListReq extends BasePageReq {
  status: number;
  tagId: number;
  priority: number;
  keyword: string;
}
