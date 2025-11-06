export type TaskStatus = "todo" | "inprogress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type DateType = "today" | "tomorrow" | "specific" | "range" | "none";
export type RemindType =
  | "none"
  | "on_time"
  | "one_day_before"
  | "two_days_before"
  | "one_week_before"
  | "custom";
export type RepeatType =
  | "none"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "workday"
  | "legal_workday";

// 自定义提前单位枚举
export enum AdvanceTimeUnit {
  Minute = 0,
  Hour = 1,
  Day = 2,
  Week = 3,
}

// 标签类型
export interface Tag {
  id: number;
  name: string;
}

// 时间记录类型
export interface TimeRecord {
  finishedAt?: string;
  startedAt?: string;
  pausedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// 基础任务类型
export interface TodoBase {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  // 日期相关
  dateType: DateType;
  dueDate?: string; // 截止日期
  startDate?: string; // 开始日期（dateType=range时使用）

  userId: number;

  // 提醒相关
  remindType: RemindType;
  remindTime?: string; // 提醒时间点，remindType不为none时必填

  // 自定义提醒设置
  advanceType?: AdvanceTimeUnit; // 仅remindType=custom时使用
  advanceValue?: number; // 仅remindType=custom时使用

  // 重复设置
  repeatType: RepeatType;

  // 状态相关
  isOverdue: boolean;

  // 时间相关
  finishedAt?: string;
  startedAt?: string;
  pausedAt?: string;
  createdAt: string;
  updatedAt: string;
  timeLine: TimeRecord;

  // 其他
  tags: Tag[];
  order?: number;
}
export interface Todo extends TodoBase {
  id: number;
}
