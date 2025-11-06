import { useEffect, useRef, useState } from "react";
import BoardView from "./components/BoardView";
import TaskFilter, { FilterType } from "./components/TaskFilters";
import { Todo } from "./type";
import TaskContext from "./context";
import TaskDetailModal from "@/components/TaskDetailModal";
import TaskFormModal from "@/components/TaskFormModal";
import { reqTodoListAll } from "@/services/api/home";
import { TaskStatus } from "@/types/task";
import { TodoListRes } from "@/services/api/home/type";
function TaskPage() {
  // 获取任务列表
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoListMap, setTodoListMap] = useState<
    Record<TaskStatus, TodoListRes>
  >({
    todo: {} as TodoListRes,
    inprogress: {} as TodoListRes,
    done: {} as TodoListRes,
  });
  const initData = async () => {
    console.log("✅ 正确的 initData 被调用了！");

    const res = await reqTodoListAll();
    setTodoListMap({
      todo: res[0],
      inprogress: res[1],
      done: res[2],
    });
  };
  useEffect(() => {
    initData();
  }, []);
  const [activeFilter, setActiveFitler] = useState<FilterType>("all");
  const changeFilter = (type: FilterType) => {
    setActiveFitler(type);
  };
  const updateTodoStatus = (id: number, status: Todo["status"]) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const changeOrder = (todoId: number, dropId: number) => {
    if (todoId === dropId) return;

    setTodos((prevTodos) => {
      const arr = [...prevTodos];

      const draggedTodo = arr.find((t) => t.id === todoId);
      const dropTodo = arr.find((t) => t.id === dropId);

      if (!draggedTodo || !dropTodo) return prevTodos;

      // 更新状态
      draggedTodo.status = dropTodo.status;

      // 获取目标状态下的所有任务（排除当前拖拽的任务）
      const targetStatusTodos = arr
        .filter((t) => t.status === dropTodo.status && t.id !== todoId)
        .sort((a, b) => b.order! - a.order!); // 降序：大的在前

      // 找到drop目标的位置
      const dropIndex = targetStatusTodos.findIndex((t) => t.id === dropId);

      const newOrder = calculateNewOrder(targetStatusTodos, dropIndex);
      draggedTodo.order = newOrder;

      return arr.sort((a, b) => b.order! - a.order!);
    });
  };

  const calculateNewOrder = (
    targetStatusTodos: Todo[],
    dropIndex: number
  ): number => {
    if (targetStatusTodos.length === 0) {
      return 100; // 空状态默认值
    }

    if (dropIndex === 0) {
      // 插入到开头（最前面），需要比第一个更大的order
      return targetStatusTodos[0].order! + 100;
    }

    if (dropIndex === targetStatusTodos.length) {
      // 插入到末尾（最后面），需要比最后一个更小的order
      return targetStatusTodos[targetStatusTodos.length - 1].order! - 100;
    }

    // 插入到中间
    const prevOrder = targetStatusTodos[dropIndex - 1].order!; // 前面的（更大的值）
    const nextOrder = targetStatusTodos[dropIndex].order!; // 后面的（更小的值）

    return calculateMiddleOrder(prevOrder, nextOrder, targetStatusTodos);
  };

  const calculateMiddleOrder = (
    prevOrder: number, // 更大的值（排在前面）
    nextOrder: number, // 更小的值（排在后面）
    targetStatusTodos: Todo[]
  ): number => {
    const middleOrder = Math.floor((prevOrder + nextOrder) / 2);

    // 检查中间值是否冲突，且确保在正确范围内
    if (
      !targetStatusTodos.some((t) => t.order === middleOrder) &&
      middleOrder < prevOrder &&
      middleOrder > nextOrder
    ) {
      return middleOrder;
    }

    // 冲突了，从大到小寻找空位
    for (let offset = 1; offset < prevOrder - nextOrder; offset++) {
      const downOrder = prevOrder - offset; // 从大值向下找
      if (
        !targetStatusTodos.some((t) => t.order === downOrder) &&
        downOrder > nextOrder
      ) {
        return downOrder;
      }
    }

    // 没有空位，触发重排
    return triggerRebalance(targetStatusTodos, prevOrder);
  };

  const triggerRebalance = (
    targetStatusTodos: Todo[],
    prevOrder: number // 更大的值
  ): number => {
    console.log("触发重排，重新分配order值");

    // 找到插入位置（在降序数组中）
    const insertIndex =
      targetStatusTodos.findIndex((t) => t.order! <= prevOrder) + 1;

    // 重新分配order值，从大到小分配
    const maxOrder = Math.max(...targetStatusTodos.map((t) => t.order!));
    const baseOrder = maxOrder + 100; // 确保有足够的起始空间

    targetStatusTodos.forEach((todo, index) => {
      if (index < insertIndex) {
        // 插入点之前的任务
        todo.order = baseOrder - index * 100;
      } else {
        // 插入点之后的任务（为插入位置留空间）
        todo.order = baseOrder - (index + 1) * 100;
      }
    });

    // 返回插入位置的order（在插入点的位置）
    return baseOrder - insertIndex * 100;
  };

  // 查看
  const [view, setView] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>({} as Todo);
  // 编辑/新增
  const [showEdit, setShowEdit] = useState(false);
  const [type, setType] = useState<"edit" | "add">("add");
  const openModal = (type: "view" | "edit" | "add", todo?: Todo) => {
    if (type === "view") {
      setView(true);
    } else {
      setView(false);
      setShowEdit(true);
      setType(type);
    }
    if (todo) {
      setCurrentTodo(todo);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <TaskContext.Provider
      value={{
        todos,
        updateTodoStatus,
        onReorder: changeOrder,
        openModal,
        todoListMap,
        getTaskAllList: initData,
      }}
    >
      <div className="task-page" ref={containerRef}>
        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={changeFilter}
          todos={todos}
        />
        <BoardView />
        <TaskDetailModal
          id={currentTodo.id}
          open={view}
          close={() => setView(false)}
        />
        <TaskFormModal
          id={currentTodo.id}
          open={showEdit}
          type={type}
          close={() => setShowEdit(false)}
          status={currentTodo.status}
          getContainer={containerRef.current || document.body}
        />
      </div>
    </TaskContext.Provider>
  );
}

export default TaskPage;
