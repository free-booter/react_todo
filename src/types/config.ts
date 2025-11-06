import { RemindType, RepeatType } from "@/views/Task/type";

export const RemindTypeConfig: { label: string; value: RemindType }[] = [
  { value: "none", label: "无" },
  { value: "on_time", label: "准时提醒" },
  { value: "one_day_before", label: "提前1天" },
  { value: "two_days_before", label: "提前2天" },
  { value: "one_week_before", label: "提前1周" },
  { value: "custom", label: "自定义提醒" },
];

export const RepeatTypeConfig: { label: string; value: RepeatType }[] = [
  { label: "不重复", value: "none" },
  { label: "每天重复", value: "daily" },
  { label: "每周重复", value: "weekly" },
  { label: "每月重复", value: "monthly" },
  { label: "每年重复", value: "yearly" },
  { label: "工作日重复", value: "workday" },
  { label: "法定工作日", value: "legal_workday" },
];
