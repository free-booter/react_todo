import SvgIcon from "@/components/SvgIcon";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Checkbox, Dropdown, MenuProps, message, Tag, Tooltip } from "antd";
import "./index.less";
import { useState, useEffect } from "react";
import { TaskStatus } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import { TodoListItem } from "@/services/api/home/type";
import { deleteTodo } from "@/services/api/home";
import { useTaskStore } from "@/store/task";
import { statusList } from "@/views/Task";

export default function TaskItem({ data }: { data: TodoListItem }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"add" | "edit">("add");
  const openModal = (type: "add" | "edit") => {
    setOpen(true);
    setType(type);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const taskStore = useTaskStore();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "编辑",
      icon: <EditOutlined />,
      onClick: () => openModal("edit"),
    },
    {
      key: "2",
      label: "删除",
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        deleteTodo({ id: data.id }).then(() => {
          const target = statusList.find(item => item.value === data.status) as { label: keyof typeof taskStore.taskListMap, value: TaskStatus }
          taskStore.setTaskListMap({
            ...taskStore.taskListMap,
            [target?.label]: taskStore.taskListMap[target?.label].list.filter(
              (task) => task.id !== data.id
            ),
          });
          messageApi.success("删除成功");
        });
      },
    },
  ];

  const [status, setStatus] = useState(data.status);
  const changeStatus = () => {
    setStatus(status === 1 ? 2 : status === 2 ? 3 : 1); // 1: 待处理 2: 进行中 3: 已完成
    // message.success("又一个小目标被你收入囊中！");
  };
  // 优先级class
  const priorityClassName = [
    { label: "无优先级", value: "none" },
    { label: "低优先级", value: "low" },
    { label: "中优先级", value: "medium" },
    { label: "高优先级", value: "high" },
  ];
  // 更改状态样式
  const changeStatusStyle = () => {
    if (status === 1) {
      return <Checkbox className="mr-2" onChange={changeStatus}></Checkbox>;
    } else if (status === 2) {
      return (
        <div
          className="mr-2 process flex items-center cursor-pointer"
          onClick={changeStatus}
        >
          <SvgIcon name="task-doing" color="#0958D9" />
        </div>
      );
    } else {
      return (
        <SvgIcon
          name="task-check-circle"
          color="#52C41A"
          size={20}
          className="mr-2"
        />
      );
    }
  };
  useEffect(() => {
    changeStatusStyle();
  }, [status]);
  return (
    <>
      <div className={`task-item ${priorityClassName[data.priority - 1].value
        }`}>
        {contextHolder}
        <div className="task-item__header flex items-center">
          {data.status !== 3 && changeStatusStyle()}
          {/* 标题 */}
          <div className="task-item__title">{data.title}</div>
          {/* 更多 */}
          <div className="task-item__more flex items-center">
            {/* 优先级 */}
            {
              data.priority && (
                <div
                  className={`task-item__flag ${priorityClassName[data.priority].value}`}
                >
                  {priorityClassName[data.priority].label}
                </div>
              )
            }

            {/* 更多 */}
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
        {
          data.description && (
            <div className="task-item__content">
              <Tooltip title={data.description}>
                <div className="task-item__description">{data.description}</div>
              </Tooltip>
            </div>
          )
        }
        {
          data.date && (
            <div className="task-item__date">
              <ClockCircleOutlined />
              <span style={{ marginLeft: 5 }} className="whitespace-nowrap">
                {data.date}
              </span>
            </div>
          )
        }
        {
          data.tagIds.length > 0 && (
            <div className="task-item__tags">
              {data.tagIds.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
          )
        }
      </div>
      <TaskModal
        id={data.id}
        type={type}
        open={open}
        close={() => setOpen(false)}
      />
    </>
  );
}
