import { TodoListRes } from "@/services/api/home/type";
import { create } from "zustand";

interface TaskStore {
  taskListMap: {
    todo: TodoListRes;
    doing: TodoListRes;
    done: TodoListRes;
  };
  setTaskListMap: (taskListMap: TaskStore["taskListMap"]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  taskListMap: {
    todo: {} as TodoListRes,
    doing: {} as TodoListRes,
    done: {} as TodoListRes,
  },
  setTaskListMap: (taskListMap) => set({ taskListMap }),
}));
