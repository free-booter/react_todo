import TaskItem from "./TaskItem";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
import { useState } from "react";
import { TaskPriority } from "@/types/task";
import TaskModal from "@/components/TaskModal";
import { TodoListItem } from "@/services/api/home/type";
import SvgIcon from "../SvgIcon";

export default function TaskCard({
  data,
}: {
  data: {
    title: string;
    taskList: TodoListItem[];
    icon: string;
    color: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  return (
    <>
      <Card
        title={
          <div className="flex items-center gap-2">
            <SvgIcon name={data.icon} color={data.color} />
            <span className="text-sm text-gray-500">{data.title}</span>
          </div>
        }
        extra={
          <a onClick={() => openModal()}>
            <PlusOutlined />
          </a>
        }
        className="task-card"
      >
        <div className="grid  gap-2.5">
          {data.taskList?.map((item) => (
            <TaskItem data={item} key={item.id} />
          ))}
        </div>
      </Card>
      {/* <TaskModal data={
        taskList[0]
      } type="add" open={open} close={() => setOpen(false)} /> */}
    </>
  );
}
