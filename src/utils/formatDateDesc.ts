import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.locale("zh-cn");
// 格式化日期：本周内显示周几，今年显示 MM-DD，否则 YYYY-MM-DD
export function formatDate(d?: string): string {
  if (!d) return "";
  const day = dayjs(d);
  const now = dayjs();

  // 判断是否有时分秒
  const hasTime = /(\d{2}):(\d{2})(:\d{2})?/.test(d);
  if (day.isSame(now, "week")) {
    return hasTime
      ? `${day.format("ddd")} ${day.format("HH:mm")}`
      : day.format("ddd"); // 周几（Mon, Tue...）
  }

  if (day.isSame(now, "year")) {
    return hasTime ? day.format("MM-DD HH:mm") : day.format("MM-DD");
  }

  return hasTime ? day.format("YYYY-MM-DD HH:mm") : day.format("YYYY-MM-DD");
}

/**
 * 判断任务是否逾期
 * @param date 到期日期
 * @param finishedTime 可选 任务完成日期
 * @returns number 逾期天数
 */
export function getOverdueDays(date: string, finishedTime?: string): number {
  const deadline = dayjs(date);
  let diffDays = 0;

  if (finishedTime) {
    // 逾期完成
    const finished = dayjs(finishedTime).format("YYYY-MM-DD");
    diffDays = dayjs(finished).diff(deadline, "day", true);
  } else {
    const now = dayjs().format("YYYY-MM-DD");
    diffDays = dayjs(now).diff(deadline, "day", true);
  }

  return diffDays > 0 ? diffDays : 0;
}

/**
 * 格式化逾期天数
 * @param date 到期日期
 * @param finishedTime 可选 任务完成日期
 * @returns 如果逾期则返回文案[逾期xx天]否则返回周几/MM-DD/YYYY-MM-DD
 */
export function formatOverdueDays(date: string, finishedTime?: string): string {
  const diffDays = getOverdueDays(date, finishedTime);
  if (diffDays <= 0) return formatDate(finishedTime || date);

  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const remainingDays = (diffDays % 365) % 30;

  let str = "逾期 ";
  if (years > 0) str += `${years} 年 `;
  if (months > 0) str += `${months} 个月 `;
  if (remainingDays > 0) str += `${remainingDays} 天`;

  return str.trim();
}
