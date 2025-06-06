export interface ITaskItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: TaskStatus;
  isCompleted: boolean;
  priority: TaskPriority;
  dateType: number;
  date: string; // 指定日期
  dateRange?: string[]; // 时间段
  time?: string; // 具体时间
  advanceType?: number; // 提前类型
  advanceHours?: number; // 提前小时数
  advanceDays?: number; // 提前天数
  advanceWeeks?: number; // 提前周数
  remindType?: number;
  remindTime?: string; // 提醒时间
  repeatType?: number; // 重复类型
}

export type TaskStatus = "todo" | "done";
export enum TaskPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}
