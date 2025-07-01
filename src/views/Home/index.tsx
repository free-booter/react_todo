import { Space } from "antd";
import "./index.less";
import TaskCard from "@/components/TaskCard";
import { TodoListItem } from "@/services/api/home/type";
import { useEffect, useState } from "react";
import { reqTodoList } from "@/services/api/home";
import { TaskPriority, TaskStatus } from "@/types/task";
export default function Home() {
  // 获取待办列表
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);
  const [doingList, setDoingList] = useState<TodoListItem[]>([]);
  const [doneList, setDoneList] = useState<TodoListItem[]>([]);

  useEffect(() => {
    Object.keys(TaskStatus).map((status) => {
      reqTodoList({
        current: 1,
        size: 10,
        reqData: { status: Number(status) },
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
      <Space size={20} className="w-full grid grid-cols-3 items-start h-full">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </Space>
    </div>
  );
}
