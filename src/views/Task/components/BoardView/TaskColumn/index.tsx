import { Todo } from "@/views/Task/type";
import TaskCard from "../../TaskCard";
import { ReactNode, useState } from "react";
import { useTaskContext } from "@/views/Task/context";
import { PlusOutlined } from "@ant-design/icons";

function TaskColumn({
  todos,
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
  todos: Todo[];
}) {
  const [placeholderId, setPlaceholderId] = useState<number | null>(null);

  // 事件在可拖动的元素或者被选择的文本被拖进一个有效的放置目标时（每几百毫秒）触发
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const targetEl = (e.target as HTMLElement).closest(
      ".task-card"
    ) as HTMLElement;
    const dropId = targetEl?.dataset.id;
    setPlaceholderId(Number(dropId));
  };

  // 事件在拖动的元素或选中的文本离开一个有效的放置目标时被触发
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // 只有当鼠标离开整个列时才清除状态
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setPlaceholderId(null);
    }
  };

  // 事件在元素或文本选择被放置到有效的放置目标上时触发
  const { onReorder, openModal } = useTaskContext();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData("todo-id");
    if (todoId && placeholderId) {
      onReorder(Number(todoId), Number(placeholderId));
    }
    setPlaceholderId(null);
  };

  return (
    <div
      className="task-column bg-white rounded-xl p-4 h-fit"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-2 mb-5">
        {icon}
        <span className="text-sm text-gray-500">{title}</span>
        <div className="p-1 rounded-lg  ml-auto cursor-pointer hover:bg-gray-1">
          <PlusOutlined
            className="color-gray"
            onClick={() => openModal("add")}
          />
        </div>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {placeholderId === todo.id && (
            <div className="h-2 bg-primary/30 rounded-full my-1 transition-all duration-200 mb-4"></div>
          )}
          <TaskCard todo={todo} />
        </div>
      ))}
    </div>
  );
}

export default TaskColumn;
