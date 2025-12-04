import { reqTodoListAll, reqUpdateTodoStatus } from "@/services/api/home";
import { TodoListReq, TodoListRes } from "@/services/api/home/type";
import { TaskStatus, Todo } from "@/types/task";
import { create } from "zustand";

export interface TaskStore {
  // 状态
  todoListMap: Record<TaskStatus, TodoListRes>;
  loading: boolean;
  maxOrder: number;

  // 方法
  setTodoListMap: (map: Record<TaskStatus, TodoListRes>) => void;
  updateTodoStatus: (id: number, status: TaskStatus) => void;
  deleteTodo: (id: number, status: TaskStatus) => void;
  getTaskAllList: (data?: TodoListReq) => Promise<void>;
  getTodoById: (id: number) => Todo | null;
  setMaxOrder: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // 初始状态
  todoListMap: {
    todo: {} as TodoListRes,
    inprogress: {} as TodoListRes,
    done: {} as TodoListRes,
  },
  loading: false,
  maxOrder: 0,
  // 方法
  setTodoListMap: (map: Record<TaskStatus, TodoListRes>) => {
    set({ todoListMap: map });
    get().setMaxOrder();
  },
  // 获取所有任务列表
  getTaskAllList: async (data?: TodoListReq) => {
    set({ loading: true });
    const res = await reqTodoListAll(data);
    get().setMaxOrder();
    set({
      todoListMap: {
        todo: res[0],
        inprogress: res[1],
        done: res[2],
      },
      loading: false,
    });
  },
  // 更新单个todo的状态
  updateTodoStatus: async (id: number, status: TaskStatus) => {
    set({ loading: true });
    await reqUpdateTodoStatus({ id, status });
    // 找到对应的todo
    const todo = get().todoListMap[status].list.find((t) => t.id === id);
    if (todo) {
      set((state) => ({
        todoListMap: {
          ...state.todoListMap,
          [status]: {
            ...state.todoListMap[status],
            list: state.todoListMap[status].list.map((t) =>
              t.id === id ? { ...t, status } : t
            ),
          },
        },
      }));
    }
  },
  // 删除todo
  deleteTodo: (id: number, status: TaskStatus) => {
    set({ loading: true });
    set((state) => {
      const currentList = state.todoListMap[status].list || [];
      const filteredList = currentList.filter((t) => t.id !== id);
      console.log("delete");

      return {
        todoListMap: {
          ...state.todoListMap,
          [status]: {
            ...state.todoListMap[status],
            list: filteredList,
            total: state.todoListMap[status].total - 1,
          },
        },
      };
    });
    set({ loading: false });
  },
  // 根据todoId获取todo
  getTodoById: (id: number) => {
    const { todoListMap } = get();
    const statuses: TaskStatus[] = ["todo", "inprogress", "done"];

    for (const s of statuses) {
      const f = todoListMap[s].list.find((t) => t.id === id);
      if (f) return f;
    }
    return null;
  },
  // 设置最大的order值
  setMaxOrder: () => {
    const { todoListMap } = get();
    const maxOrder = Math.max(
      ...Object.values(todoListMap)
        .map((item) => item.list?.map((el) => el.order))
        .flat(1)
        .filter((el) => el !== undefined)
    );
    set({ maxOrder });
  },
}));
