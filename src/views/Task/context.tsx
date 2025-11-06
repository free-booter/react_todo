import { createContext, useContext } from "react";
import { TaskStatus, Todo } from "./type";
import { TodoListRes } from "@/services/api/home/type";

type TaskContextType = {
  todos: Todo[];
  updateTodoStatus: (id: number, status: Todo["status"]) => void;
  onReorder: (todoId: number, dropId: number) => void;
  openModal: (type: "view" | "edit" | "add", todo?: Todo) => void;
  todoListMap: Record<TaskStatus, TodoListRes>;
  // 获取任务列表
  getTaskAllList: () => void;
};

// 默认值只是兜底
const TaskContext = createContext<TaskContextType>({
  todos: [],
  updateTodoStatus: () => {},
  onReorder: () => {},
  openModal: () => {},
  todoListMap: {
    todo: {} as TodoListRes,
    inprogress: {} as TodoListRes,
    done: {} as TodoListRes,
  },
  getTaskAllList: () => {
    console.log("-----调用列表-----");
  },
});

// 方便子组件直接 use
export const useTaskContext = () => useContext(TaskContext);

export default TaskContext;
