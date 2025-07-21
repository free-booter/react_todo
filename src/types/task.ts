export interface TodoDetail {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: number;
  priority: TaskPriority;

  dateType: number; // 1今天、2明天、3指定日期、4时间段、0无截止日期
  date: string; // 指定日期
  dateRange?: string; // 时间段

  remindType?: number; // 提前类型： 0准时、1提前一天、2提前2天、3提前一周、4自定义
  remindValue?: number; // 提前数
  remindTime?: string; // 提醒时间
  repeatType?: number; // 重复类型
}

// export type TaskStatus = "todo" | "doing" | "done";
export enum TaskPriority {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}
export enum TaskStatus {
  todo = 1,
  doing = 2,
  done = 3,
}

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  dateType: number;
  startDate: string;
  endDate: string;
  repeatType: number;
  specificTime: string;
  remindType: number;
  remindTime: string;
  advanceType: number;
  advanceValue: number;
  status: TaskStatus;
  createAt: string;
  userId: number;
  tags: string[];
}
