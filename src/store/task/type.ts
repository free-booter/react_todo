import {
  TodoListItem,
  TodoListReq,
  TodoListRes,
} from "@/services/api/home/type";
export type TaskStatus = "todo" | "doing" | "done" | string;

export interface TaskStore {
  taskListMap: {
    todo: TodoListRes;
    doing: TodoListRes;
    done: TodoListRes;
  };
  setTaskListMap: (
    taskListMap:
      | TaskStore["taskListMap"]
      | ((prev: TaskStore["taskListMap"]) => TaskStore["taskListMap"])
  ) => void;
  updateTaskList: (
    mapKey: keyof TaskStore["taskListMap"],
    data: TodoListItem,
    action: "add" | "edit" | "del"
  ) => void;
  getAllTaskList: (params?: TodoListReq) => void;
  getTaskOneType: (status: TaskStatus) => void;
  getTotal: () => number;
}
