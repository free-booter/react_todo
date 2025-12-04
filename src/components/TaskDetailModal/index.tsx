import { reqTodoDetail } from "@/services/api/home";
import { Button, Flex, Modal, Tag, Timeline } from "antd";
import { useEffect, useState } from "react";
import StatusIcon from "../statusIcon";
import {
  Award,
  Bell,
  Calendar,
  CalendarPlus,
  CalendarSync,
  CircleCheck,
  CircleCheckBig,
  ClockAlert,
  Flag,
  Repeat,
  Sparkles,
  Tags,
  Zap,
} from "lucide-react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { TodoDetail } from "@/services/api/home/type";
import dayjs, { ManipulateType } from "dayjs";
import { formatDate } from "@/utils/formatDateDesc";
import { RemindTypeConfig, RepeatTypeConfig } from "@/types/config";
import PriorityTag from "../priorityTag";
import { Todo, RemindType } from "@/types/task";

function TaskDetail({
  id,
  open,
  close,
  getContainer,
}: {
  id: number;
  open: boolean;
  close: () => void;
  getContainer?: false | HTMLElement | (() => HTMLElement);
}) {
  const [detail, setDetail] = useState({ timeLine: {} } as Todo);
  const [loading, setLoading] = useState<boolean>(true);
  const getTaskDetail = (id: number) => {
    setLoading(true);
    reqTodoDetail(id)
      .then((res) => {
        setDetail(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (open && id) {
      getTaskDetail(id);
    }
  }, [open]);

  const renderTimeLine = () => {
    const { status } = detail;
    const data = [
      {
        children: (
          <>
            <div className="text-slate-700 text-sm">任务创建</div>
            <div className="text-slate-500 text-xs">
              {formatDate(detail?.timeLine?.createdAt)}
            </div>
          </>
        ),
      },
      {
        dot: (
          <>
            {status === "todo" ? (
              <div className="size-3 rounded-full bg-gray-50 border-2 border-dashed border-blue-300 flex items-center justify-center relative z-10 opacity-40">
                <Zap className="size-3.5 text-blue-400" />
              </div>
            ) : (
              <Zap className="size-4 text-blue-400" />
            )}
          </>
        ),
        children: (
          <>
            {status === "todo" ? (
              <>
                <div className="flex items-center gap-3 relative opacity-40">
                  <div className="flex-1">
                    <div className="text-xs text-blue-400">等待开始</div>
                    <div className="text-xs text-blue-400">
                      点击开始处理任务
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm  text-blue-700">开始处理</div>
                  <div className="text-xs text-blue-500">
                    {formatDate(detail?.timeLine?.startedAt)}
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            )}
          </>
        ),
      },
    ];
    if (status !== "todo") {
      data.push({
        dot: (
          <>
            {status === "inprogress" ? (
              <div className="size-4 rounded-full bg-emerald-50 border-2 border-dashed border-emerald-300 flex items-center justify-center relative z-10 opacity-40">
                <CircleCheckBig className="size-3.2 text-emerald-400" />
              </div>
            ) : (
              <CircleCheckBig className="size-4 text-emerald-400" />
            )}
          </>
        ),
        children: (
          <>
            {status === "inprogress" ? (
              <div className="flex items-center gap-3 relative opacity-40">
                <div className="flex-1">
                  <div className="text-xs  text-emerald-400">等待完成</div>
                  <div className="text-xs text-emerald-400">
                    标记任务为已完成
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm  text-emerald-700">任务完成</div>
                  <div className="text-xs text-emerald-500">
                    {formatDate(detail?.timeLine?.finishedAt)}
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-emerald-500" />
              </div>
            )}
          </>
        ),
      });
    }
    return data;
  };

  const renderRemindDesc = () => {
    const { createdAt, remindTime, remindType, remindOffset = 0 } = detail;
    if (detail.remindType === "none") return "无";
    else if (detail.remindType && detail.remindType !== "custom") {
      // 非自定义
      const RemindValueMap: Record<RemindType, number | null> = {
        none: null, // 对应“无”
        on_time: 0, // 当天
        one_day_before: 1, // 提前 1 天
        two_days_before: 2, // 提前 2 天
        one_week_before: 7, // 提前 7 天
        custom: null,
      };
      let day = RemindValueMap[remindType] as number;
      // 获取减去提前天数的值
      const targetDate = dayjs(createdAt)
        .subtract(day, "day")
        .format("YYYY-MM-DD");
      return `${formatDate(targetDate)} ${detail.remindTime}`;
    } else if (detail.remindOffset && detail.remindType === "custom") {
      // 自定义提醒

      const datePart = dayjs(createdAt).format("YYYY-MM-DD");
      let remindAt = dayjs(`${datePart} ${remindTime}`);
      const targetDate = dayjs(remindAt)
        .subtract(Math.abs(remindOffset), "minute" as ManipulateType)
        .format("YYYY-MM-DD HH:mm");
      return formatDate(targetDate);
    }
  };
  return (
    <Modal
      title={
        <>
          <div className="text-xl">{detail.title}</div>
        </>
      }
      open={open}
      loading={loading}
      footer={null}
      onCancel={() => close()}
      getContainer={getContainer}
    >
      <div className="task-detail-modal bg-white rounded-lg">
        <div className="border-b-solid border-1 border-slate-3 pb-2">
          <div className="flex items-center gap-4 mb-2">
            {detail.status === "todo" && (
              <div className="px-2 py-0.5 rounded-md overflow-hidden text-xs bg-amber-50 text-amber-600 border-amber-200 border-1px border-solid">
                <span>待办</span>
              </div>
            )}
            {detail.status === "inprogress" && (
              <div className="px-2 py-0.5 rounded-md overflow-hidden text-xs bg-blue-50 text-blue-600 border-blue-200 border-1px border-solid">
                <span>进行中</span>
              </div>
            )}
            {detail.status === "done" && (
              <div className="px-2 py-0.5 rounded-md overflow-hidden text-xs bg-emerald-50 text-emerald-600 border-emerald-200 border-1px border-solid">
                <span>已完成</span>
              </div>
            )}
            {/* 优先级 */}
            <PriorityTag type={detail.priority} />
          </div>
          <div>
            <div className="text-slate-700 leading-relaxed">
              {detail.description}
            </div>
          </div>
        </div>
        <Timeline className="mt-5 ml-1" items={renderTimeLine()} />
        <div>
          <div className="text-sm font-semibold text-gray-800 mb-4">
            详细信息
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="bg-gray-100 px-2.2 py-1 pt-2 rounded-lg">
              <Calendar size={16} className="color-gray-500" />
            </div>
            <div className="flex  flex-col">
              <span className="text-xs text-slate-500">截止日期</span>
              <span className="text-13px">
                {detail.dateType === "none" ? "无" : formatDate(detail.dueDate)}
              </span>
            </div>
          </div>
          {detail.isOverdue && (
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-red-100 px-2.2 py-1 pt-2 rounded-lg">
                <ClockAlert size={16} className="color-red-500" />
              </div>
              <div className="flex  flex-col">
                <span className="text-xs text-red-500">已逾期</span>
                <span className="text-13px">24天</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mt-3">
            <div className="bg-blue-100 px-2.2 py-1 pt-2 rounded-lg">
              <Bell size={16} className="color-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">提醒时间</span>
              <span className="text-13px">{renderRemindDesc()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="bg-purple-100 px-2.2 py-1 pt-2 rounded-lg">
              <CalendarSync size={16} className="color-purple-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">重复</span>
              <span className="text-13px">
                {
                  RepeatTypeConfig.find((el) => el.value === detail.repeatType)
                    ?.label
                }
              </span>
            </div>
          </div>
        </div>
        {detail.tags?.length > 0 && (
          <div className="mt-4 mb-2 flex items-center">
            <span className="mr-1">标签</span>
            <Tags size={12} />
          </div>
        )}

        <Flex gap="4px 0" wrap>
          {detail.tags?.map((el) => (
            <Tag key={el.id}>{el.name}</Tag>
          ))}
        </Flex>
      </div>
    </Modal>
  );
}

export default TaskDetail;
