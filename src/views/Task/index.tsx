import StatisticCard from "@/components/StatisticCard";
import "./index.less";

export default function Task() {
  return (
    <div className="task-page">
      <div className="task-header grid grid-cols-4 gap-4">
        <StatisticCard
          title="今日任务"
          value={10}
          footer={<div>已完成 3/10</div>}
          type="primary"
        />
        <StatisticCard
          title="待处理优先级"
          value={4}
          footer={<div>2个高优先级</div>}
          type="primary"
        />
        <StatisticCard
          title="今日已完成"
          value={3}
          footer={<div>完成率42.8%</div>}
          type="primary"
        />
        <StatisticCard
          title="本周目标"
          value={
            <div>
              已完成 15
              <span className="fw-normal" style={{ fontSize: "14px" }}>
                /20
              </span>
            </div>
          }
          footer={<div>已完成 75%</div>}
          type="primary"
        />
      </div>
    </div>
  );
}
