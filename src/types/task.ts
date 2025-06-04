export interface ITaskItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
  status: TaskStatus;
  isCompleted: boolean;
  priority: TaskPriority;
}

export type TaskStatus = "todo" | "done";
export type TaskPriority = "low" | "medium" | "high";
