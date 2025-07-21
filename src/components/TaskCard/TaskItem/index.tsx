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
import { TodoDetail } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import { TodoListItem } from "@/services/api/home/type";

export default function TaskItem({ data }: { data: TodoListItem }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"add" | "edit">("add");
  const openModal = (type: "add" | "edit") => {
    setOpen(true);
    setType(type);
  };
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
    },
  ];

  const [status, setStatus] = useState(data.status);
  const changeStatus = () => {
    setStatus(status === 1 ? 2 : status === 2 ? 3 : 1); // 1: 待处理 2: 进行中 3: 已完成
    // message.success("又一个小目标被你收入囊中！");
  };
  // 优先级class
  const priorityClassName = [
    { label: "高优先级", value: "high" },
    { label: "中优先级", value: "medium" },
    { label: "低优先级", value: "low" },
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
    console.log(status);

    changeStatusStyle();
  }, [status]);
  return (
    <>
      <div className={`task-item ${priorityClassName[data.priority - 1].value
        }`}>
        <div className="task-item__header flex items-center">
          {data.status !== 3 && changeStatusStyle()}
          {/* 标题 */}
          <div className="task-item__title">{data.title}</div>
          {/* 更多 */}
          <div className="task-item__more flex items-center">
            {/* 优先级 */}
            <div
              className="task-item__flag"
            >
              {priorityClassName[data.priority - 1].label}
            </div>
            {/* 更多 */}
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined />
              </a>
            </Dropdown>
          </div>
        </div>

        <div className="task-item__content">
          <Tooltip title={data.description}>
            <div className="task-item__description">{data.description}</div>
          </Tooltip>
        </div>
        <div className="task-item__date">
          <ClockCircleOutlined />
          <span style={{ marginLeft: 5 }} className="whitespace-nowrap">
            {data.date}
          </span>
        </div>
        <div className="task-item__tags">
          {data.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>
      {/* <TaskModal
        data={data}
        type={type}
        open={open}
        close={() => setOpen(false)}
      /> */}
    </>
  );
}
