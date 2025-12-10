import PriorityTag from "@/components/priorityTag";
import { Todo } from "../../type";
import { Dropdown, MenuProps, Modal, Tag, Tooltip } from "antd";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import StatusIcon from "@/components/statusIcon";
import "./index.less";
import { useTaskContext } from "../../context";
import { Calendar } from "lucide-react";
import { useContext, useState } from "react";
import { getOverdueDays } from "@/utils/formatDateDesc";
import { useTaskStore } from "@/store/task";
import { reqUpdateTodoStatus } from "@/services/api/home";
import { MessageContext } from "@/context/MessageContext";
import { getPriorityBadgeColor } from "@/utils";

interface TodoCardProps {
  todo: Todo;
}
function TaskCard({ todo }: TodoCardProps) {
  const [modal, modalContentHolder] = Modal.useModal();
  const messageApi = useContext(MessageContext)!;
  const { deleteTodo, getTaskAllList } = useTaskStore();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "编辑",
      icon: <EditOutlined />,
      disabled: todo.status === "done",
      onClick: (e: any) => {
        e.domEvent.stopPropagation();
        openModal("edit", todo);
      },
    },
    {
      key: "2",
      label: "删除",
      danger: true,
      icon: <DeleteOutlined />,
      onClick: async (e: any) => {
        e.domEvent.stopPropagation();
        const confirm = await modal.confirm({
          title: "提示",
          content: "确定要删除吗？",
        });
        if (!confirm) return;
        await deleteTodo(todo.id, todo.status);
        messageApi.success("删除成功");
      },
    },
  ];

  const { openModal } = useTaskContext();
  const changeStatus = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    reqUpdateTodoStatus({
      id: todo.id,
      status: todo.status === "todo" ? "inprogress" : "done",
    }).then(() => {
      getTaskAllList();
      messageApi.success("状态更新成功");
    });
  };

  // 拖拽
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("todo-id", String(todo.id));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  return (
    <div>
      {modalContentHolder}
      <div
        draggable
        data-id={todo.id}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => openModal("view", todo)}
        className={`task-card border-l-4px border-l-solid shadow transition-all cursor-pointer rounded-xl p-2 mb-4
        ${getPriorityBadgeColor(todo.priority)}
        ${isDragging && "opacity-50 scale-95 rotate-2 shadow-lg"}
    `}
      >
        <div className="flex items-center gap-x-2">
          {/* 标题 */}
          <div
            className={`${
              todo.status === "done" ? "line-through" : ""
            } text-base font-medium text-ellipsis overflow-hidden whitespace-nowrap`}
          >
            {todo.title}
          </div>
          {/* 更多 */}
          <div className="ml-auto flex items-center shrink-0">
            <PriorityTag type={todo.priority} />

            {/* 更多 */}
            <div onClick={(e) => e.stopPropagation()}>
              <Dropdown className="ml-4" menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
        {todo.description && (
          <div className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            <Tooltip title={todo.description}>
              <div>{todo.description}</div>
            </Tooltip>
          </div>
        )}
        {todo.tags?.length > 0 && (
          <div className="task-item__tags mt-2">
            {todo?.tags?.map((tag, index) => (
              <Tag key={index}>{tag.name}</Tag>
            ))}
          </div>
        )}
        <div className="border-t-gray-2 border-t-1 border-t-solid mt-10px pt-2 text-xs">
          {/* 截止到期时间 */}
          {todo.dateType !== "none" && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={13} />
              <span>
                截止{" "}
                {todo.dateType === "range"
                  ? `${todo.startDate} - ${todo.dueDate}`
                  : todo.dueDate}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex items-center text-slate-500">
              <ClockCircleOutlined className="mr-5px" />
              <div>
                创建于{dayjs(todo.createdAt).format("YYYY-MM-DD HH:mm")}
              </div>
            </div>
            <div className="action" onClick={changeStatus}>
              <div
                className={`
                flex items-center gap-x-1
                ${todo.status === "todo" && "doingTag"}
                ${todo.status === "inprogress" && "doneTag"}
                ${todo.status === "done" && "todoTag"}
              `}
              >
                <StatusIcon
                  type={
                    todo.status === "todo"
                      ? "inprogress"
                      : todo.status === "inprogress"
                      ? "done"
                      : "todo"
                  }
                  size={12}
                />
                {todo.status === "todo"
                  ? "开始"
                  : todo.status === "inprogress"
                  ? "完成"
                  : "重新开始"}
              </div>
            </div>
          </div>
          {/* 逾期 */}
          {todo.isOverdue && (
            <div className="flex items-center mt-1">
              <WarningOutlined className="color-red-600 mr-1 text-base" />
              <span className="color-red-600 text-sm">
                逾期{getOverdueDays(todo.dueDate!)}天
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
