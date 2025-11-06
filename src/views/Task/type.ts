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

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  // 日期相关
  startDate?: string; // 开始日期（dateType=range时使用）
  dueDate?: string; // 截止日期
  dateType: DateType;

  userId: number;

  // 提醒相关
  remindType: RemindType; // 提醒类型
  remindTime?: string; // 提醒时间点 "HH:mm"，remindType不为none时必填
  remindOffset?: number; // 提醒偏移量（分钟），负数表示提前
  advanceType?: number; // 自定义提前单位：0分钟 1小时 2天 3周（仅remindType=custom时使用）
  advanceValue?: number; // 自定义提前数值（仅remindType=custom时使用）

  // 重复设置
  repeatType: RepeatType;

  // 状态相关
  isOverdue: boolean;
  finishedAt?: string;
  createdAt: string;
  updatedAt?: string;

  // 其他
  tags: Array<{ id: number; name: string }>;
  order?: number;
}
