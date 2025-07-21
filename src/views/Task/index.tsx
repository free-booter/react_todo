import StatisticCard from "@/components/StatisticCard";
import "./index.less";
import { Progress } from "antd";
import SvgIcon from "@/components/SvgIcon";
import TaskCard from "@/components/TaskCard";
import { TaskItem, TaskPriority, TaskStatus } from "@/types/task";
import { useState } from "react";

export default function Task() {
  const [taskList] = useState<TaskItem[]>([
    {
      id: 1,
      title: "学习react基础语法",
      description:
        "学习react基础语法，包括组件、状态、事件等。学会自己封装组件。使用antd组件库。自己写一个项目。并将其记录到github上。顺便可以学习下typescript。",
      tags: ["学习", "前端", "react"],
      date: "2025-05-29",
      status: TaskStatus.todo,
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
    <div className="task-page">
      <div className="task-header grid grid-cols-4 gap-4">
        <StatisticCard
          title="今日任务"
          value={10}
          footer={
            <div className="flex items-center">
              <SvgIcon
                name="task-point"
                color="#0958d9"
                size={20}
                className="mr-2"
              />
              <div>已完成 3/10</div>
            </div>
          }
          type="primary"
        />
        <StatisticCard
          title="待处理优先级"
          value={4}
          footer={
            <div className="flex items-center">
              <SvgIcon
                name="task-alarm-circle"
                color="#ef4444"
                size={17}
                className="mr-2"
              />
              <div>2个高优先级</div>
            </div>
          }
          type="primary"
        />
        <StatisticCard
          title="今日已完成"
          value={3}
          footer={
            <div className="flex items-center">
              <SvgIcon
                name="task-check-circle"
                color="#52C41A"
                size={20}
                className="mr-2"
              />
              <div>完成率42.8%</div>
            </div>
          }
          type="primary"
        />
        <StatisticCard
          title="本周目标"
          value={
            <div>
              15
              <span className="fw-normal" style={{ fontSize: "14px" }}>
                /20
              </span>
            </div>
          }
          footer={
            <>
              <Progress percent={75} strokeColor={"#6200ea"} />
              <div>已完成 75%</div>
            </>
          }
          type="primary"
        />
      </div>
      {/* 任务分类 */}
      <div className="task-list grid gap-10 grid-cols-3 mt-5">
        <TaskCard
          data={{
            title: "待处理",
            taskList,
            icon: "task-todo",
            color: "#faad14",
          }}
        />
        <TaskCard
          data={{
            title: "正在进行",
            taskList,
            icon: "task-doing",
            color: "#0958d9",
          }}
        />
        <TaskCard
          data={{
            title: "已完成",
            taskList,
            icon: "task-check-circle",
            color: "#52c41a",
          }}
        />
      </div>
    </div>
  );
}
