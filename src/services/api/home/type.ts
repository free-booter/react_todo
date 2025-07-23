import { BasePageReq, BasePageRes } from "@/services/types";
import { TaskPriority } from "@/types/task";

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
  status?: number;
  tagId?: number;
  priority?: number;
  keyword?: string;
}

export interface TodoDetail {
  id: number;
  title: string;
  description: string;
  tagIds: string[];
  status: number;
  priority: TaskPriority;

  dateType: number; // 1今天、2明天、3指定日期、4时间段、0无截止日期
  date: string; // 指定日期
  dateRange?: string; // 时间段
  specificTime?: string; // 指定时间

  remindType?: number; // 提前类型： 0准时、1提前一天、2提前2天、3提前一周、4自定义
  remindValue?: number; // 提前数
  remindTime?: string; // 提醒时间
  repeatType?: number; // 重复类型
}
