import { Space } from "antd";
import "./index.less";
import TaskCard from "@/components/TaskCard";
export default function Home() {
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
