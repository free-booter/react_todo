import {
  TodoListItem,
  TodoListReq,
  TodoListRes,
} from "@/services/api/home/type";
import { create } from "zustand";
import { TaskStore, TaskStatus } from "./type";
import { reqTodoList, reqTodoListAll } from "@/services/api/home";

export const useTaskStore = create<TaskStore>((set, get) => ({
  taskListMap: {
    todo: { total: 0, list: [] as any } as TodoListRes,
    doing: { total: 0, list: [] as any } as TodoListRes,
    done: { total: 0, list: [] as any } as TodoListRes,
  },
  setTaskListMap: (taskListMap) =>
    set((state) => ({
      taskListMap:
        typeof taskListMap === "function"
          ? taskListMap(state.taskListMap)
          : taskListMap,
    })),

  // 更新task
  updateTaskList: (mapKey, data, action) =>
    set((state) => ({
      taskListMap: {
        ...state.taskListMap,
        [mapKey]: {
          ...state.taskListMap[mapKey],
          list: updateList(state.taskListMap[mapKey].list, data, action),
        },
      },
    })),

  // 获取全部的task
  getAllTaskList: async (params: TodoListReq = {} as any) => {
    const statusList = ["todo", "doing", "done"] as const;
    const results = await reqTodoListAll(params);

    const taskListMap = statusList.reduce((acc, key, idx) => {
      acc[key] = results[idx];
      return acc;
    }, {} as Record<(typeof statusList)[number], TodoListRes>);

    set({ taskListMap });
  },
  // 分页单个的task
  getTaskOneType: async (status: TaskStatus) => {
    const { taskListMap } = get();
    const { current, size } = taskListMap[status as keyof typeof taskListMap];
    const res = await reqTodoList({
      current: current + 1,
      size,
      status: Number(status),
    });
    set((state) => ({
      taskListMap: {
        ...state.taskListMap,
        [status]: {
          list: [
            ...state.taskListMap[status as keyof typeof taskListMap].list,
            ...res.list,
          ],
          total: res.total,
          current: res.current,
          size,
        },
      },
    }));
  },
  // 获取总共task数量
  getTotal: () => {
    const { taskListMap } = get();
    return (
      taskListMap.todo.total + taskListMap.doing.total + taskListMap.done.total
    );
  },
}));

type TaskAction = "add" | "edit" | "del";

const updateList = (
  list: TodoListItem[] = [],
  data: TodoListItem,
  action: TaskAction
): TodoListItem[] => {
  switch (action) {
    case "add":
      return [data, ...list];
    case "edit":
      return list.map((item) => (item.id === data.id ? data : item));
    case "del":
      return list.filter((item) => item.id !== data.id);
    default:
      return list;
  }
};

export type { TaskStore };
