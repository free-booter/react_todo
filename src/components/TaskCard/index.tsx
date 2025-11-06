import TaskItem from "./TaskItem";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
import { useState } from "react";
import { TaskStatus } from "@/types/task";
import TaskModal from "@/components/TaskFormModal";
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
    status: TaskStatus;
  };
}) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const todoId = e.dataTransfer.getData("todo-id");
    if (todoId) {
      // onStatusChange(todoId, status);
      console.log("handleDrop", todoId, data.status);
    }
  };
  return (
    <div>
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
      >
        <div
          className="grid  gap-2.5"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {data?.taskList?.map((item) => (
            <TaskItem data={item} key={item.id} />
          ))}
        </div>
      </Card>
      {open && (
        <TaskModal
          type="add"
          open={open}
          close={() => setOpen(false)}
          status={data.status}
        />
      )}
    </div>
  );
}
