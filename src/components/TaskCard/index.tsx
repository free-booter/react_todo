import TaskItem from "./TaskItem";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
import { useState } from "react";
import { ITaskItem } from "@/types/task";
import { TaskPriority } from "@/types/task";
import TaskModal from "@/components/TaskModal";

export default function TaskCard() {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const [taskList] = useState<ITaskItem[]>([
    {
      id: 1,
      title: "学习react基础语法",
      description:
        "学习react基础语法，包括组件、状态、事件等。学会自己封装组件。使用antd组件库。自己写一个项目。并将其记录到github上。顺便可以学习下typescript。",
      tags: ["学习", "前端", "react"],
      date: "2025-05-29",
      status: "todo",
      isDone: false,
      priority: TaskPriority.HIGH,
      dateType: 1,
      remindType: 1,
      repeatType: 0,
    },
    {
      id: 2,
      title: "学习Vue基础语法",
      description:
        "学习Vue基础语法，包括组件、状态、事件等。学会自己封装组件。使用antd组件库。自己写一个项目。并将其记录到github上。顺便可以学习下typescript。",
      tags: ["学习", "前端", "vue"],
      date: "2025-05-29",
      status: "todo",
      isDone: false,
      priority: TaskPriority.MEDIUM,
      dateType: 1,
      remindType: 1,
      repeatType: 0,
    },
    {
      id: 3,
      title: "学习Vue基础语法",
      description:
        "学习Vue基础语法，包括组件、状态、事件等。学会自己封装组件。使用antd组件库。自己写一个项目。并将其记录到github上。顺便可以学习下typescript。",
      tags: ["学习", "前端", "vue"],
      date: "2025-05-29",
      status: "todo",
      isDone: false,
      priority: TaskPriority.LOW,
      dateType: 1,
      remindType: 1,
      repeatType: 0,
    },
    {
      id: 4,
      title: "学习Vue基础语法",
      description:
        "学习Vue基础语法，包括组件、状态、事件等。学会自己封装组件。使用antd组件库。自己写一个项目。并将其记录到github上。顺便可以学习下typescript。",
      tags: ["学习", "前端", "vue"],
      date: "2025-05-29",
      status: "todo",
      isDone: false,
      priority: TaskPriority.MEDIUM,
      dateType: 1,
      remindType: 1,
      repeatType: 0,
    },
  ]);

  return (
    <>
      <Card
        title="未完成"
        extra={
          <a onClick={() => openModal()}>
            <PlusOutlined />
          </a>
        }
        className="task-card"
      >
        <div className="grid  gap-2.5">
          {taskList.map((item) => (
            <TaskItem data={item} key={item.id} />
          ))}
        </div>
      </Card>
      <TaskModal type="add" open={open} close={() => setOpen(false)} />
    </>
  );
}
