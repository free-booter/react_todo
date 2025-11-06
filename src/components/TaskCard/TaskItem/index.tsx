import SvgIcon from "@/components/SvgIcon";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Dropdown,
  MenuProps,
  message,
  Modal,
  Tag,
  Tooltip,
} from "antd";
import "./index.less";
import { useState } from "react";
import { TaskPriority, TaskStatus } from "@/types/task";
import TaskCreate from "@/components/TaskFormModal";
import { TodoListItem } from "@/services/api/home/type";
import { deleteTodo, reqUpdateTodoStatus } from "@/services/api/home";
import { useTaskStore } from "@/store/task";
import { statusList } from "@/views/Task";
import { formatOverdueDays } from "@/utils/formatDateDesc";
import TaskDetail from "@/components/TaskDetailModal";
import PriorityTag from "@/components/priorityTag";
import dayjs from "dayjs";
import { Zap } from "lucide-react";
import StatusIcon from "@/components/statusIcon";

export default function TaskItem({ data }: { data: TodoListItem }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"add" | "edit">("add");
  const openModal = (type: "add" | "edit") => {
    setOpen(true);
    setType(type);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContentHolder] = Modal.useModal();
  const taskStore = useTaskStore();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "编辑",
      icon: <EditOutlined />,
      disabled: data.status === TaskStatus.done,
      onClick: (e: any) => {
        e.domEvent.stopPropagation(); // ✅ 阻止冒泡
        openModal("edit");
      },
    },
    {
      key: "2",
      label: "删除",
      danger: true,
      icon: <DeleteOutlined />,
      onClick: async () => {
        const confirm = await modal.confirm({
          title: "提示",
          content: "确定要删除吗？",
        });
        if (!confirm) return;
        deleteTodo({ id: data.id }).then(() => {
          const target = statusList.find(
            (item) => item.value === data.status
          ) as { label: keyof typeof taskStore.taskListMap; value: TaskStatus };
          taskStore.updateTaskList(target?.label, data, "del");
          messageApi.success("删除成功");
        });
      },
    },
  ];
  const changeStatus = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const arr = [2, 3, 1];
    const status = arr[data.status - 1];
    e.stopPropagation(); // 阻止表单提交刷新页面
    reqUpdateTodoStatus({
      id: data.id,
      status,
    }).then(() => {
      if (status === 2) {
        taskStore.updateTaskList("todo", data, "del");
        taskStore.updateTaskList("doing", { ...data, status }, "add");
      } else if (status === 3) {
        // 先删除
        taskStore.updateTaskList("doing", data, "del");
        taskStore.updateTaskList("done", { ...data, status }, "add");
      }
      messageApi.success("又一个小目标被你收入囊中！");
    });
  };
  // 格式化时间描述文案
  const handleDateDesc = (data: TodoListItem) => {
    // 判断什么时候需要携带分秒
    if (data.status === TaskStatus.done) {
      // 已结束的
      return formatOverdueDays(data.date, data.finishedTime);
    } else {
      return formatOverdueDays(data.date);
    }
  };

  const [openView, setOpenView] = useState(false);

  // 拖拽
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("todo-id", data.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`task-item border-l-4px border-l-solid shadow transition-all cursor-pointer
        ${
          data.priority === TaskPriority.NONE &&
          "bg-gray-50 border-gray-3 hover:border-gray-5"
        }
        ${
          data.priority === TaskPriority.LOW &&
          "bg-cyan-50  border-cyan-3 hover:border-cyan-5 "
        }
        ${
          data.priority === TaskPriority.MEDIUM &&
          "bg-orange-50  border-orange-3 hover:border-orange-5 "
        }
        ${
          data.priority === TaskPriority.HIGH &&
          "bg-red-50 border-red-3 hover:border-red-5 "
        }
        `}
        onClick={() => setOpenView(true)}
      >
        {contextHolder}
        {modalContentHolder}
        <div className="task-item__header flex items-center">
          {/* 标题 */}
          <div
            className={`task-item__title ${
              data.status === TaskStatus.done ? "line-through" : ""
            }`}
          >
            {data.title}
          </div>
          {/* 更多 */}
          <div className="task-item__more flex items-center">
            <PriorityTag type={data.priority} />

            {/* 更多 */}
            <Dropdown className="ml-4" menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
        {data.description && (
          <div className="task-item__content">
            <Tooltip title={data.description}>
              <div className="task-item__description">{data.description}</div>
            </Tooltip>
          </div>
        )}
        {data.date && (
          <div className="task-item__date">
            {data.status !== TaskStatus.done ? (
              <ClockCircleOutlined />
            ) : (
              <SvgIcon name="task-check" color="#52c41a" />
            )}

            <span style={{ marginLeft: 5 }} className="whitespace-nowrap">
              {handleDateDesc(data)}
              {data.status !== TaskStatus.done &&
                !data.isOverdue &&
                data.remindTime?.slice(0, 5)}
            </span>
          </div>
        )}
        {data.tags?.length > 0 && (
          <div className="task-item__tags">
            {data?.tags?.map((tag, index) => (
              <Tag key={index}>{tag.name}</Tag>
            ))}
          </div>
        )}

        <div className="border-t-gray-2 border-t-1 border-t-solid mt-10px pt-2 text-xs flex justify-between">
          <div className="flex items-center text-slate-500">
            <ClockCircleOutlined className="mr-5px" />
            <div>创建于{dayjs(data.createdAt).format("YYYY-MM-DD HH:mm")}</div>
          </div>
          <div className="action" onClick={(e: any) => changeStatus(e)}>
            <div
              className={`
                flex items-center gap-x-1
                ${data.status === TaskStatus.todo && "doingTag"}
                ${data.status === TaskStatus.doing && "doneTag"}
                ${data.status === TaskStatus.done && "todoTag"}
              `}
            >
              <StatusIcon
                type={data.status === TaskStatus.done ? 1 : data.status + 1}
                size={12}
              />
              {data.status === TaskStatus.todo
                ? "开始"
                : data.status === TaskStatus.doing
                ? "完成"
                : "重新开始"}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <TaskCreate
          id={data.id}
          type={type}
          open={open}
          close={() => setOpen(false)}
          status={data.status}
        />
      )}
      {openView && (
        <TaskDetail
          id={data.id}
          open={openView}
          close={() => setOpenView(false)}
        />
      )}
    </>
  );
}
