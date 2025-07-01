import { BasePageReq, BasePageRes } from "@/services/types";

export type TodoListItem = {
  id: number;
  title: string;
  description?: string;
  status: number;
  priority: number;
  createTime: string;
  updateTime: string;
};
export interface TodoListRes extends BasePageRes<TodoListItem> {}

export interface TodoListReq extends BasePageReq {
  reqData: {
    status: number;
  };
}
