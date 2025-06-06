import SvgIcon from "@/components/SvgIcon";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Checkbox, Dropdown, MenuProps, Tag, Tooltip } from "antd";
import "./index.less";
import { useState } from "react";
import { ITaskItem } from "@/types/task";
import TaskModal from "@/components/TaskModal";

export default function TaskItem({ data }: { data: ITaskItem }) {
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

  return (
    <>
      <div className="task-item">
        <div className="task-item__header flex items-center">
          <div className="task-item__flag todo">
            <SvgIcon size={20} name="task-flag-fill" />
          </div>
          <Checkbox className="mr-5"></Checkbox>
          <div className="task-item__more">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined />
              </a>
            </Dropdown>
          </div>
        </div>

        <div className="task-item__content">
          <div className="task-item__title">
            <span>{data.title}</span>
          </div>
          <Tooltip title={data.description}>
            <div className="task-item__description">{data.description}</div>
          </Tooltip>
        </div>
        <div className="task-item__footer">
          <div className="task-item__tags">
            {data.tags.map((tag, index) => (
              <Tag color="blue" key={index}>
                {tag}
              </Tag>
            ))}
          </div>
          <div className="task-item__date">
            <ClockCircleOutlined />
            <span style={{ marginLeft: 5 }} className="whitespace-nowrap">
              {data.date}
            </span>
          </div>
        </div>
      </div>
      <TaskModal
        data={data}
        type={type}
        open={open}
        close={() => setOpen(false)}
      />
    </>
  );
}
