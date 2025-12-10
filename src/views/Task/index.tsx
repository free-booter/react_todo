import { useEffect, useState } from "react";
import BoardView from "./components/BoardView";
import ListView from "./components/ListView";
import TaskFilter from "./components/TaskFilters";
import { Todo } from "./type";
import TaskContext from "./context";
import TaskDetailModal from "@/components/TaskDetailModal";
import TaskFormModal from "@/components/TaskFormModal";
import { reqUpdateTaskOrder } from "@/services/api/home";
import { TaskStatus } from "@/types/task";
import { useTaskStore } from "@/store/task";
import _ from "lodash";
import ViewSwitch, { ViewType } from "./components/ViewSwitch";
import "./index.less";

function TaskPage() {
  const { getTaskAllList, todoListMap, getTodoById, setTodoListMap } =
    useTaskStore();

  // 视图切换
  const [viewType, setViewType] = useState<ViewType>("Kanban");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<
    "idle" | "exit" | "enter"
  >("idle");

  // 处理视图切换动画
  const handleViewChange = (newViewType: ViewType) => {
    if (newViewType === viewType || isAnimating) return;

    setIsAnimating(true);
    setAnimationState("exit");
    setViewType(newViewType);
    // 退出动画（250ms）
    setTimeout(() => {
      setAnimationState("enter");

      // 进入动画（300ms）
      setTimeout(() => {
        setAnimationState("idle");
        setIsAnimating(false);
      }, 300);
    }, 250);
  };

  useEffect(() => {
    getTaskAllList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 查看
  const [currentTodo, setCurrentTodo] = useState<Todo>({} as Todo);
  // 编辑/新增
  const [type, setType] = useState<"edit" | "add" | "view" | "">("");
  const openModal = (
    type: "view" | "edit" | "add",
    todo?: Todo | { status: TaskStatus }
  ) => {
    setType(type);
    if (todo) {
      setCurrentTodo(todo as Todo);
    } else {
      // 新增时清空之前的数据
      setCurrentTodo({} as Todo);
    }
  };

  // 拖拽逻辑
  const handleReorder = async (
    todoId: number,
    dropId: number | null,
    targetStatus?: TaskStatus
  ) => {
    if (!todoId || todoId === dropId) return;

    const dragged = _.cloneDeep(getTodoById(todoId));
    if (!dragged) return;

    const draggedStatus = dragged.status;
    let dropStatus: TaskStatus;

    // 判断目标列表是否为空
    if (dropId === null) {
      // 目标列表为空，使用传入的 targetStatus
      if (!targetStatus) return;
      dropStatus = targetStatus;
    } else {
      // 目标列表不为空，从 drop 对象获取状态
      const drop = getTodoById(dropId);
      if (!drop) return;
      dropStatus = drop.status;
    }

    // 更新状态
    dragged.status = dropStatus;
    // * 保存初始状态引用用于失败回滚（利用闭包特性，无需深拷贝）
    const initTodoListMap = todoListMap;
    // 深拷贝工作副本进行修改
    const cloneTodoListMap = _.cloneDeep(todoListMap);
    const fromList = cloneTodoListMap[draggedStatus].list;
    const toList = cloneTodoListMap[dropStatus].list;
    // 获取对应的index
    const draggedIndex = fromList.findIndex((el) => el.id === todoId);

    if (dropId === null) {
      // 目标列表为空，直接添加到列表开头
      toList.unshift(dragged);
      fromList.splice(draggedIndex, 1);
    } else {
      const dropIndex = toList.findIndex((el) => el.id === dropId);
      // 判断是否在同一列内拖拽
      if (draggedStatus === dropStatus) {
        // 同一列内拖拽，先删除再插入
        fromList.splice(draggedIndex, 1);
        const newDropIndex = toList.findIndex((el) => el.id === dropId);
        toList.splice(newDropIndex, 0, dragged);
      } else {
        // 跨列拖拽，先插入再删除
        toList.splice(dropIndex, 0, dragged);
        fromList.splice(draggedIndex, 1);
      }
    }

    // 乐观更新：先更新UI
    setTodoListMap(cloneTodoListMap);

    // 调用接口
    try {
      await reqUpdateTaskOrder({
        taskId: todoId,
        dropId: dropId || undefined,
        dropStatus,
      });
      // 接口成功后重新获取数据，确保数据一致性
      await getTaskAllList();
    } catch (error) {
      // 接口调用失败，恢复排序
      setTodoListMap(initTodoListMap);
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{ openModal, onReorder: handleReorder }}>
      <div className="task-page">
        <div className="flex justify-between items-center mb-8">
          <TaskFilter />
          <ViewSwitch value={viewType} onChange={handleViewChange} />
        </div>

        {/* 视图容器 - 带切换动画 */}
        <div
          className={`view-container ${
            animationState === "exit"
              ? "view-exit"
              : animationState === "enter"
              ? "view-enter"
              : ""
          }`}
        >
          {viewType === "Kanban" ? <BoardView /> : <ListView />}
        </div>

        {type === "view" && (
          <TaskDetailModal
            id={currentTodo.id}
            open={type === "view"}
            close={() => setType("")}
          />
        )}
        <TaskFormModal
          id={currentTodo.id}
          open={type === "add" || type === "edit"}
          type={type === "add" ? "add" : "edit"}
          close={() => setType("")}
          status={currentTodo.status}
        />
      </div>
    </TaskContext.Provider>
  );
}

export default TaskPage;
