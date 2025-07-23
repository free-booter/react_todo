import StatisticCard from "@/components/StatisticCard";
import "./index.less";
import { Progress } from "antd";
import SvgIcon from "@/components/SvgIcon";
import TaskCard from "@/components/TaskCard";
import { TaskStatus } from "@/types/task";
import { useEffect } from "react";
import { reqTodoList } from "@/services/api/home";
import { useTaskStore } from "@/store/task";

export const statusList = [
  { label: "todo", value: TaskStatus.todo },
  { label: "doing", value: TaskStatus.doing },
  { label: "done", value: TaskStatus.done },
];
export default function Task() {
  const taskStore = useTaskStore();
  const getAllTaskList = () => {
    // 获取3种状态的任务列表
    Promise.all(
      statusList.map((status) =>
        reqTodoList({
          current: 1,
          size: 10,
          status: status.value,
        })
      )
    ).then((results) => {
      taskStore.setTaskListMap({
        todo: results[0],
        doing: results[1],
        done: results[2],
      });
    });
  };

  useEffect(() => {
    getAllTaskList();
  }, []);

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
            taskList: taskStore.taskListMap.todo.list,
            icon: "task-todo",
            color: "#faad14",
          }}
        />
        <TaskCard
          data={{
            title: "正在进行",
            taskList: taskStore.taskListMap.doing.list,
            icon: "task-doing",
            color: "#0958d9",
          }}
        />
        <TaskCard
          data={{
            title: "已完成",
            taskList: taskStore.taskListMap.done.list,
            icon: "task-check-circle",
            color: "#52c41a",
          }}
        />
      </div>
    </div>
  );
}
