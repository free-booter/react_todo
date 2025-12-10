import { useState, useEffect } from "react";
import { reqTaskCalender } from "@/services/api/home";
import { CalendarProps, Calendar } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Calendar as CalendarType } from "@/services/api/home/type";
dayjs.locale("zh-cn");
import "./index.less";
import { getPriorityBadgeColor } from "@/utils";
import { PlusCircleOutlined } from "@ant-design/icons";

function CalendarView() {
  // 获取当前显示的日期范围
  const [visibleRange, setVisibleRange] = useState<{
    start: string;
    end: string;
  }>({ start: "", end: "" });
  const [calendarData, setCalendarData] = useState<CalendarType>({
    range: {
      start: "",
      end: "",
    },
    events: [],
  });
  const handleVisibleRange = (month: Dayjs) => {
    // 总共有42个格子
    const start = month.startOf("month").startOf("week");
    let end = month.endOf("month").endOf("week");
    // 判断加起来是不是有42个格子
    const totalDays = end.diff(start, "day") + 1;
    if (totalDays < 42) {
      // 在加一周
      end = end.add(1, "week");
    }
    setVisibleRange({
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
    });
  };
  useEffect(() => {
    // 默认获取当月的
    handleVisibleRange(dayjs());
  }, []);
  useEffect(() => {
    if (visibleRange.start && visibleRange.end) {
      getTaskCalender();
    }
  }, [visibleRange.start, visibleRange.end]);
  const getTaskCalender = async () => {
    const { start, end } = visibleRange;
    const res = await reqTaskCalender({
      startDate: start,
      endDate: end,
    });
    setCalendarData(res);
  };
  const getListData = (value: Dayjs) => {
    const { events = [] } = calendarData;
    const listData = events.filter((task) => {
      if (task.dateType === "range") {
        return value.isAfter(task.startDate) && value.isBefore(task.dueDate);
      } else if (task.dueDate) {
        return value.isSame(task.dueDate, "day");
      }
    });
    return listData || [];
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <>
        <PlusCircleOutlined className="add-task-icon" />
        <div className="task-list">
          {listData.map((task) => (
            <div
              className={`task-cell border-l-4px border-l-solid shadow transition-all cursor-pointer rounded-xl ${getPriorityBadgeColor(
                task.priority
              )}`}
              key={task.id}
            >
              {task.title}
            </div>
          ))}
        </div>
      </>
    );
  };
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      return dateCellRender(current);
    }
    if (info.type === "month") {
      return monthCellRender(current);
    }
    return info.originNode;
  };
  const onPanelChange: CalendarProps<Dayjs>["onPanelChange"] = (
    value,
    mode
  ) => {
    // 当月份切换时，更新当前月份
    if (mode === "month") {
      handleVisibleRange(value);
    }
  };

  return (
    <div>
      <Calendar onPanelChange={onPanelChange} cellRender={cellRender} />
    </div>
  );
}

export default CalendarView;
