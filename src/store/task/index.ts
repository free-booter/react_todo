import {
  reqDeleteTodo,
  reqTodoListAll,
  reqUpdateTodoStatus,
} from "@/services/api/home";
import { TodoListReq, TodoListRes } from "@/services/api/home/type";
import { TaskStatus, Todo } from "@/types/task";
import { create } from "zustand";

export interface TaskStore {
  // 状态
  todoListMap: Record<TaskStatus, TodoListRes>;
  loading: boolean; // 简化：只用于列表加载

  // 方法
  setTodoListMap: (map: Record<TaskStatus, TodoListRes>) => void;
  updateTodoStatus: (id: number, status: TaskStatus) => Promise<void>;
  deleteTodo: (id: number, status: TaskStatus) => Promise<void>;
  getTaskAllList: (data?: TodoListReq) => Promise<void>;
  getTodoById: (id: number) => Todo | null;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // 初始状态
  todoListMap: {
    todo: {} as TodoListRes,
    inprogress: {} as TodoListRes,
    done: {} as TodoListRes,
  },
  loading: false, // 简化：只用于列表加载

  // 方法
  setTodoListMap: (map: Record<TaskStatus, TodoListRes>) => {
    set({ todoListMap: map });
  },

  // 获取所有任务列表
  getTaskAllList: async (data?: TodoListReq) => {
    try {
      set({ loading: true });
      const res = await reqTodoListAll(data);
      set({
        todoListMap: {
          todo: res[0],
          inprogress: res[1],
          done: res[2],
        },
      });
    } catch (error) {
      console.error("获取任务列表失败:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  // 更新单个todo的状态（乐观更新）
  updateTodoStatus: async (id: number, newStatus: TaskStatus) => {
    // 找到todo所在的旧状态
    const { todoListMap } = get();
    const statuses: TaskStatus[] = ["todo", "inprogress", "done"];
    let oldStatus: TaskStatus | null = null;
    let todo: Todo | null = null;

    for (const s of statuses) {
      const found = todoListMap[s].list?.find((t) => t.id === id);
      if (found) {
        oldStatus = s;
        todo = found;
        break;
      }
    }

    if (!todo || !oldStatus) return;

    // 保存原始状态用于回滚
    const originalTodoListMap = todoListMap;

    try {
      // 🚀 乐观更新：立即更新UI，不等待接口
      set((state) => {
        const newMap = { ...state.todoListMap };
        // 从旧列表移除
        newMap[oldStatus!] = {
          ...newMap[oldStatus!],
          list: newMap[oldStatus!].list.filter((t) => t.id !== id),
          total: newMap[oldStatus!].total - 1,
        };
        // 添加到新列表
        newMap[newStatus] = {
          ...newMap[newStatus],
          list: [...newMap[newStatus].list, { ...todo!, status: newStatus }],
          total: newMap[newStatus].total + 1,
        };
        return { todoListMap: newMap };
      });

      // 后台调用接口
      await reqUpdateTodoStatus({ id, status: newStatus });
    } catch (error) {
      console.error("更新任务状态失败，回滚UI:", error);
      // ❌ 失败则回滚
      set({ todoListMap: originalTodoListMap });
      throw error;
    }
  },
  // 删除todo（乐观更新）
  deleteTodo: async (id: number, status: TaskStatus) => {
    const { todoListMap } = get();
    const originalTodoListMap = todoListMap;
    const deletedTodo = todoListMap[status].list?.find((t) => t.id === id);

    if (!deletedTodo) return;

    try {
      // 🚀 乐观更新：立即更新UI
      set((state) => {
        const currentList = state.todoListMap[status].list || [];
        const filteredList = currentList.filter((t) => t.id !== id);
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

      // 后台调用接口
      await reqDeleteTodo({ id });
    } catch (error) {
      console.error("删除任务失败，回滚UI:", error);
      // ❌ 失败则回滚
      set({ todoListMap: originalTodoListMap });
      throw error;
    }
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
}));
