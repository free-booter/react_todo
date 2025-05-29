import TaskItem from "./TaskItem";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
export default function TaskCard() {
  return (
    <Card
      title="未完成"
      extra={
        <a href="#">
          <PlusOutlined />
        </a>
      }
      className="task-card"
    >
      <div className="grid  gap-2.5">
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </div>
    </Card>
  );
}
