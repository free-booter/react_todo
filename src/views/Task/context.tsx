import { createContext, useContext } from "react";
import { Todo } from "./type";
import { TaskStatus } from "@/types/task";

type TaskContextType = {
  openModal: (
    type: "view" | "edit" | "add",
    todo?: Todo | { status: TaskStatus }
  ) => void;
  /**
   * 重排
   * @param todoId 被拖拽todoId
   * @param dropId 目标id（需要移动在目标id上方），如果目标列表为空则为 null
   * @param targetStatus 目标状态（当目标列表为空时使用）
   * @returns
   */
  onReorder: (
    todoId: number,
    dropId: number | null,
    targetStatus?: TaskStatus
  ) => void;
};

const TaskContext = createContext<TaskContextType>({
  openModal: () => {},
  onReorder: () => {},
});

// 方便子组件直接 use
export const useTaskContext = () => useContext(TaskContext);

export default TaskContext;
