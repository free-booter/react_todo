import { TaskStatus } from "@/types/task";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export const todoTaskList: Task[] = [
  {
    id: 1,
    title: "任务1",
    description: "任务1描述",
    status: "todo",
  },
  {
    id: 2,
    title: "任务2",
    description: "任务2描述",
    status: "todo",
  },
  {
    id: 3,
    title: "任务3",
    description: "任务3描述",
    status: "todo",
  },
];

export const doingTaskList: Task[] = [
  {
    id: 1,
    title: "任务1",
    description: "任务1描述",
    status: "doing",
  },
];

export const doneTaskList: Task[] = [
  {
    id: 1,
    title: "任务1",
    description: "任务1描述",
    status: "done",
  },
];
