import { BasePageReq, BasePageRes } from "@/services/types";
import { TaskStatus, TaskPriority, Todo } from "@/types/task";
import { Dayjs } from "dayjs";

export interface TodoListRes extends BasePageRes<Todo> {}

export interface TodoListReq extends BasePageReq {
  status?: TaskStatus;
  tagId?: number;
  priority?: TaskPriority;
  keyword?: string;
  isOverdue?: boolean;
  today?: boolean;
}

export interface TodoDetail {
  id: number;
  title: string;
  description: string;
  tags: Array<{ label: string; value: number }>;
  status: number;
  priority: TaskPriority;

  dateType: number; // 1今天、2明天、3指定日期、4时间段、0无截止日期
  date: string; // 指定日期
  dateRange?: Dayjs[]; // 时间段
  startDate?: string; // 开始日期
  endDate?: string; // 结束日期
  specificTime?: string; // 指定时间

  remindType: number; // 提前类型： 0准时、1提前一天、2提前2天、3提前一周、4自定义
  remindTime?: string; // 提醒时间

  advanceValue?: number; // 提前数
  advanceType?: number; // 提前类型

  repeatType?: number; // 重复类型

  isOverdue: boolean; // 是否过期
  createdAt: string;
}

export interface StatisticCounts {
  totalCount: number;
  todayCount: number;
  overdueCount: number;
  highPriorityCount: number;
}

export interface Calendar {
  range: {
    start: string;
    end: string;
  };
  events: EventTodo[];
}

interface EventTodo {
  id: number;
  title: string;
  status: number;
  priority: number;
  dateType: number;
  start: string;
  end: string;
  isOverdue: boolean;
  tags: Array<{ id: number; name: string }>;
}
