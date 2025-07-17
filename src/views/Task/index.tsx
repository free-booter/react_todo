import { Space } from "antd";
import "./index.less";
import TaskCard from "@/components/TaskCard";
import { TodoListItem } from "@/services/api/home/type";
import { useEffect, useState } from "react";
import { reqTodoList } from "@/services/api/home";
import { TaskPriority, TaskStatus } from "@/types/task";
import {
  ArrowUpOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import SvgIcon from "@/components/SvgIcon";
export default function Home() {
  // 获取待办列表
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);
  const [doingList, setDoingList] = useState<TodoListItem[]>([]);
  const [doneList, setDoneList] = useState<TodoListItem[]>([]);

  useEffect(() => {
    Object.keys(TaskStatus).map((status) => {
      if (isNaN(Number(status))) return;
      reqTodoList({
        current: 1,
        size: 10,
        status: Number(status),
      }).then((res) => {
        if (status === "1") {
          setTodoList(res.list);
        } else if (status === "2") {
          setDoingList(res.list);
        } else {
          setDoneList(res.list);
        }
      });
    });
  }, []);
  return (
    <div className="home-page">
      {/* 面板 */}
      <div className="panel">
        <div className="panel-item">
          <div className="panel-item__title">总任务</div>
          <div className="panel-item__num">24</div>
          <div className="panel-item__tip">
            <ArrowUpOutlined style={{ color: "#52C41A" }} />
            <span>较上周增长12%</span>
          </div>
        </div>
        <div className="panel-item">
          <div className="panel-item__title">待处理</div>
          <div className="panel-item__num todo">24</div>
          <div className="panel-item__tip">
            <ClockCircleOutlined />
            <span>3个任务即将到期</span>
          </div>
        </div>
        <div className="panel-item">
          <div className="panel-item__title">进行中</div>
          <div className="panel-item__num progress">24</div>
          <div className="panel-item__tip">
            <SvgIcon name="task-process" className="w-4 h-4" />
            <span>2个高优先级</span>
          </div>
        </div>
        <div className="panel-item">
          <div className="panel-item__title">已完成</div>
          <div className="panel-item__num done">24</div>
          <div className="panel-item__tip">
            <CheckOutlined />
            <span>本周完成率 85%</span>
          </div>
        </div>
      </div>
      <Space size={20} className="w-full grid grid-cols-3 items-start h-full">
        {
          <TaskCard
            data={{
              title: "待处理",
              taskList: todoList,
              icon: "task-todo",
              color: "#FAAD14",
            }}
          />
        }
        {
          <TaskCard
            data={{
              title: "正在进行",
              taskList: doingList,
              icon: "task-process",
              color: "#0958D9",
            }}
          />
        }
        {
          <TaskCard
            data={{
              title: "已完成",
              taskList: doneList,
              icon: "task-check-circle",
              color: "#52C41A",
            }}
          />
        }
      </Space>
    </div>
  );
}
