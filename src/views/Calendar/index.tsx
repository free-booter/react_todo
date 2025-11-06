// import { Calendar as AntCalendar, CalendarProps } from "antd";
// import "./index.less";
// import dayjs, { Dayjs } from "dayjs";
// import { taskList } from "./config";
// import type { Calendar, TodoDetail } from "@/services/api/home/type";
// import { TaskDateType, TaskPriority } from "@/types/task";
// import { useEffect, useState } from "react";
// import { reqTaskCalender } from "@/services/api/home";

// export default function Calendar() {
//   const [calendarData, setCalendarData] = useState<Calendar>({} as Calendar);
//   const [month, setMonth] = useState(dayjs());
//   useEffect(() => {
//     reqTaskCalender({ month: month.format("YYYY-MM") }).then((res) => {
//       setCalendarData(res);
//     });
//   }, [month]);
//   const getListData = (value: Dayjs) => {
//     const list = calendarData?.events || [];
//     return list.filter((task) => isDateInRange(value, task.start, task.end));
//   };
//   const isDateInRange = (
//     date: Dayjs,
//     startDate: string,
//     endDate: string
//   ): boolean => {
//     return (
//       !date.isBefore(dayjs(startDate), "day") &&
//       !date.isAfter(dayjs(endDate), "day")
//     );
//   };
//   const getMonthData = (value: Dayjs) => {
//     if (value.month() === 8) {
//       return 1394;
//     }
//   };
//   const monthCellRender = (value: Dayjs) => {
//     const num = getMonthData(value);
//     return num ? (
//       <div className="notes-month">
//         <section>{num}</section>
//         <span>Backlog number</span>
//       </div>
//     ) : null;
//   };

//   const getFlagClass = (priority: number) => {
//     switch (priority) {
//       case TaskPriority.NONE:
//         return "flag-none";
//       case TaskPriority.LOW:
//         return "flag-low";
//       case TaskPriority.MEDIUM:
//         return "flag-medium";
//       case TaskPriority.HIGH:
//         return "flag-high";
//       default:
//     }
//   };
//   const dateCellRender = (value: Dayjs) => {
//     const listData = getListData(value);
//     if (!listData || listData.length === 0) return null;
//     return (
//       <ul className="calendar-list">
//         {listData.map((item) => (
//           <li key={item.id} className={getFlagClass(item.priority)}>
//             {item.title}
//           </li>
//         ))}
//       </ul>
//     );
//   };
//   const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
//     if (info.type === "date") return dateCellRender(current);
//     if (info.type === "month") return monthCellRender(current);
//     return info.originNode;
//   };
//   return (
//     <div className="calendar-page">
//       <AntCalendar cellRender={cellRender} />
//       {/* 右边面板 */}
//       {/* <div className="calendar-right">
//         <div className="calendar-card">
//           <div className="card-header">今日日程</div>
//           <div className="card-content">
//             <div className="card-content__item">
//               <div className="item-title">产品需求评审</div>
//               <div className="item-time">09:00 - 09:30</div>
//             </div>
//             <div className="card-content__item">
//               <div className="item-title">产品需求评审</div>
//               <div className="item-time">09:00 - 09:30</div>
//             </div>
//             <div className="card-content__item">
//               <div className="item-title">产品需求评审</div>
//               <div className="item-time">09:00 - 09:30</div>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }

function Calendar() {
  return <div>Calendar</div>;
}

export default Calendar;
