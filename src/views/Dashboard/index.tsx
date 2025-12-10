import { useEffect, useMemo, useState } from "react";
import { Spin, Button, Empty, Tooltip, Progress } from "antd";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { Line, Pie } from "@ant-design/charts";
import { useTaskStore } from "@/store/task";
import { reqTaskCounts } from "@/services/api/home";
import { StatisticCounts } from "@/services/api/home/type";
import StatisticCard from "@/components/StatisticCard";
import StatusIcon from "@/components/statusIcon";
import PriorityTag from "@/components/priorityTag";
import TaskFormModal from "@/components/TaskFormModal";
import { TaskStatus } from "@/types/task";
import {
  LayoutList,
  CheckCircle2,
  AlertCircle,
  CalendarClock,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  ArrowRight,
} from "lucide-react";
import "./index.less";
import useUserStore from "@/store/user";

export default function Dashboard() {
  const navigate = useNavigate();
  const { todoListMap, getTaskAllList } = useTaskStore();
  const { userInfo } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<StatisticCounts>({
    totalCount: 0,
    todayCount: 0,
    overdueCount: 0,
    highPriorityCount: 0,
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    id?: number;
    status: TaskStatus;
  } | null>(null);

  // 获取统计数据
  const fetchStatistics = async () => {
    try {
      const data = await reqTaskCounts();
      setStatistics(data);
    } catch (error) {
      console.error("获取统计数据失败:", error);
    }
  };

  // 初始化数据
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        await Promise.all([getTaskAllList(), fetchStatistics()]);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  // 计算完成率
  const completionRate = useMemo(() => {
    const total = statistics.totalCount;
    const done = todoListMap.done?.total || 0;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [statistics.totalCount, todoListMap.done?.total]);

  // 获取所有任务
  const allTasks = useMemo(() => {
    return [
      ...(todoListMap.todo?.list || []),
      ...(todoListMap.inprogress?.list || []),
      ...(todoListMap.done?.list || []),
    ];
  }, [todoListMap]);

  // 最近创建的任务
  const recentTasks = useMemo(() => {
    return allTasks
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      )
      .slice(0, 5);
  }, [allTasks]);

  // 优先级分布数据
  const priorityData = useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 };
    allTasks.forEach((t) => {
      if (t.priority === "high") counts.high++;
      if (t.priority === "medium") counts.medium++;
      if (t.priority === "low") counts.low++;
    });
    return [
      { type: "高优先级", value: counts.high, color: "#ff4d4f" },
      { type: "中优先级", value: counts.medium, color: "#faad14" },
      { type: "低优先级", value: counts.low, color: "#52c41a" },
    ].filter((d) => d.value > 0);
  }, [allTasks]);

  // 计算趋势数据
  const completionTrendData = useMemo(() => {
    const data = [];
    const today = dayjs();
    const doneTasks = todoListMap.done?.list || [];

    for (let i = 6; i >= 0; i--) {
      const date = today.subtract(i, "day");
      const dateStr = date.format("YYYY-MM-DD");
      const count = doneTasks.filter((task) => {
        if (!task.finishedAt) return false;
        return dayjs(task.finishedAt).format("YYYY-MM-DD") === dateStr;
      }).length;

      data.push({
        date: date.format("MM-DD"),
        count,
      });
    }
    return data;
  }, [todoListMap.done?.list]);

  // 问候语
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "早上好";
    if (hour < 18) return "下午好";
    return "晚上好";
  };

  // 本周概览数据
  const weekOverview = useMemo(() => {
    const today = dayjs();
    const weekStart = today.startOf("week");
    const weekEnd = today.endOf("week");

    const weekTasks = allTasks.filter((task) => {
      if (!task.dueDate) return false;
      const dueDate = dayjs(task.dueDate);
      return (
        dueDate.isAfter(weekStart.subtract(1, "day")) &&
        dueDate.isBefore(weekEnd.add(1, "day"))
      );
    });

    const done = weekTasks.filter((t) => t.status === "done").length;
    const inProgress = weekTasks.filter(
      (t) => t.status === "inprogress"
    ).length;
    const todo = weekTasks.filter((t) => t.status === "todo").length;
    const total = weekTasks.length;
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

    return { done, inProgress, todo, total, completionRate };
  }, [allTasks]);

  // 图表通用配置
  const lineConfig = {
    data: completionTrendData,
    xField: "date",
    yField: "count",
    smooth: true,
    color: "#1677ff",
    area: {
      style: {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1677ff",
        opacity: 0.1,
      },
    },
    line: {
      style: {
        lineWidth: 3,
      },
    },
    point: {
      size: 0,
      shape: "circle",
    },
    grid: {
      line: {
        style: {
          stroke: "#f0f0f0",
          lineWidth: 1,
          lineDash: [4, 4],
        },
      },
    },
  };

  const pieConfig = {
    data: priorityData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: 5,
      },
    },
  };

  return (
    <div className="dashboard-page-v2">
      <Spin spinning={loading}>
        {/* 头部区域 */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="greeting">
              {getGreeting()}, {userInfo?.username || "朋友"}
            </h1>
            <p className="date-info">
              {dayjs().format("YYYY年MM月DD日")} · {dayjs().format("dddd")}
            </p>
          </div>
          <div className="header-right">
            <Button
              type="primary"
              shape="round"
              icon={<LayoutList size={16} />}
              size="large"
              onClick={() => {
                setSelectedTask({ status: "todo" });
                setShowTaskModal(true);
              }}
            >
              新建任务
            </Button>
          </div>
        </header>

        {/* 统计卡片 */}
        <div className="stats-grid">
          <StatisticCard
            title="总任务"
            value={statistics.totalCount}
            icon={<LayoutList />}
            footer="所有清单中的任务"
          />
          <StatisticCard
            title="完成率"
            value={`${completionRate}%`}
            icon={<CheckCircle2 />}
            trend={{ value: "稳步前进", isPositive: true }}
            className="success-card"
          />
          <StatisticCard
            title="今日到期"
            value={statistics.todayCount}
            icon={<CalendarClock />}
            footer="请优先处理"
            className={statistics.todayCount > 0 ? "warning-card" : ""}
          />
          <StatisticCard
            title="已逾期"
            value={statistics.overdueCount}
            icon={<AlertCircle />}
            footer={
              statistics.overdueCount > 0 ? "需要立即关注" : "暂无逾期任务"
            }
            trend={
              statistics.overdueCount > 0
                ? { value: "需关注", isPositive: false }
                : undefined
            }
            className={statistics.overdueCount > 0 ? "error-card" : ""}
          />
        </div>

        {/* 主要内容区 */}
        <div className="main-content-grid">
          {/* 左侧主要区域：图表集中地 */}
          <div className="left-column">
            {/* 趋势图表 */}
            <div className="content-card chart-section">
              <div className="card-header">
                <h3>任务完成趋势</h3>
              </div>
              <div className="card-body">
                {completionTrendData.some((d) => d.count > 0) ? (
                  <Line {...lineConfig} height={280} />
                ) : (
                  <Empty
                    description="本周暂无完成记录"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            </div>

            {/* 优先级分布（从右侧移过来） */}
            <div className="content-card pie-section">
              <div className="card-header">
                <h3>优先级分布</h3>
              </div>
              <div className="card-body">
                {priorityData.length > 0 ? (
                  <Pie {...pieConfig} height={200} />
                ) : (
                  <Empty
                    description="暂无数据"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            </div>
          </div>

          {/* 右侧边栏：功能和列表 */}
          <div className="right-column">
            {/* 番茄钟 */}
            <div className="content-card pomodoro-section">
              <PomodoroTimer />
            </div>

            {/* 本周概览 */}
            <div className="content-card week-overview-section">
              <div className="card-header">
                <h3>本周概览</h3>
              </div>
              <div className="week-overview-content">
                <div className="week-stats">
                  <div className="stat-item">
                    <span className="stat-label">总任务</span>
                    <span className="stat-value">{weekOverview.total}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">已完成</span>
                    <span className="stat-value success">
                      {weekOverview.done}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">进行中</span>
                    <span className="stat-value warning">
                      {weekOverview.inProgress}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">待办</span>
                    <span className="stat-value">{weekOverview.todo}</span>
                  </div>
                </div>
                <div className="week-progress">
                  <div className="progress-header">
                    <span>完成进度</span>
                    <span className="progress-percent">
                      {weekOverview.completionRate}%
                    </span>
                  </div>
                  <Progress
                    percent={weekOverview.completionRate}
                    strokeColor={{
                      "0%": "#87d068",
                      "100%": "#52c41a",
                    }}
                    showInfo={false}
                  />
                </div>
                <Button
                  type="link"
                  block
                  onClick={() => navigate("/task")}
                  className="view-week-tasks"
                >
                  查看本周任务 <ArrowRight size={14} />
                </Button>
              </div>
            </div>

            {/* 最近任务（从左侧移过来） */}
            <div className="content-card task-section">
              <div className="card-header flex justify-between items-center">
                <h3>最近活动</h3>
                <Button type="link" onClick={() => navigate("/task")}>
                  查看全部 <ArrowRight size={14} />
                </Button>
              </div>
              <div className="card-body">
                {recentTasks.length > 0 ? (
                  <div className="clean-task-list">
                    {recentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="clean-task-item"
                        onClick={() => navigate("/task")}
                      >
                        <div className="task-info">
                          <StatusIcon type={task.status} size={18} />
                          <span
                            className={`task-title ${
                              task.status === "done" ? "completed" : ""
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="task-meta">
                          <PriorityTag type={task.priority} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty
                    description="暂无任务"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 任务弹窗 */}
        {showTaskModal && (
          <TaskFormModal
            id={selectedTask?.id}
            type={selectedTask?.id ? "edit" : "add"}
            open={showTaskModal}
            close={() => {
              setShowTaskModal(false);
              setSelectedTask(null);
            }}
            status={selectedTask?.status || "todo"}
          />
        )}
      </Spin>
    </div>
  );
}

// 简约番茄钟
function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning && time > 0) {
      interval = window.setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
      new Audio("/notification.mp3").play().catch(() => {}); // 简单提示音尝试
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isRunning, time]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(mode === "work" ? 25 * 60 : 5 * 60);
  };
  const switchMode = () => {
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setIsRunning(false);
    setTime(newMode === "work" ? 25 * 60 : 5 * 60);
  };

  return (
    <div className={`minimal-pomodoro ${mode}`}>
      <div className="timer-header">
        <Coffee size={18} className="mode-icon" />
        <span>{mode === "work" ? "专注时刻" : "休息时间"}</span>
      </div>
      <div className="timer-circle">
        <span className="time-text">{formatTime(time)}</span>
      </div>
      <div className="timer-controls">
        <Tooltip title={isRunning ? "暂停" : "开始"}>
          <Button
            type="primary"
            shape="circle"
            icon={
              isRunning ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-1" />
              )
            }
            size="large"
            onClick={toggleTimer}
          />
        </Tooltip>
        <Tooltip title="重置">
          <Button
            shape="circle"
            icon={<RotateCcw size={18} />}
            onClick={resetTimer}
          />
        </Tooltip>
        <Tooltip title={mode === "work" ? "切换到休息" : "切换到专注"}>
          <Button shape="circle" onClick={switchMode}>
            {mode === "work" ? "☕" : "💻"}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
