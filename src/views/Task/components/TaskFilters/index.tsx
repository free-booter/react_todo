import { Badge, Button } from "antd";
import { AlertCircle, Calendar, Filter, Flag } from "lucide-react";
import { Todo } from "../../type";
import { reqTaskCounts } from "@/services/api/home";
import { useEffect, useState } from "react";
import { StatisticCounts } from "@/services/api/home/type";

export type FilterType = "all" | "today" | "overdue" | "high-priority";
export interface TodoFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todos: Todo[];
}

function TaskFilters({ activeFilter, onFilterChange }: TodoFiltersProps) {
  const [filterCounts, setFilterCounts] = useState<StatisticCounts>({
    totalCount: 0,
    todayCount: 0,
    overdueCount: 0,
    highPriorityCount: 0,
  });

  const getFilterCounts = async () => {
    const res = await reqTaskCounts();
    console.log(res);

    setFilterCounts(res);
  };
  useEffect(() => {
    getFilterCounts();
  }, []);

  const filters = [
    {
      key: "all" as const,
      label: "全部任务",
      icon: Filter,
      count: filterCounts.totalCount,
      variant: "default" as const,
    },
    {
      key: "today" as const,
      label: "今日到期",
      icon: Calendar,
      count: filterCounts.todayCount,
      variant: "secondary" as const,
    },
    {
      key: "overdue" as const,
      label: "已逾期",
      icon: AlertCircle,
      count: filterCounts.overdueCount,
      variant: "destructive" as const,
    },
    {
      key: "high-priority" as const,
      label: "高优先级",
      icon: Flag,
      count: filterCounts.highPriorityCount,
      variant: "default" as const,
    },
  ];
  return (
    <div className="task-filter mb-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className="gap-2 h-auto py-3 px-4"
              type={activeFilter === filter.key ? "primary" : "default"}
            >
              <Icon className="w-4 h-4" />
              <span>{filter.label}</span>
              {filter.count > 0 && (
                <Badge className="ml-1 min-w-[20px] h-5 text-xs justify-center ">
                  <div
                    className={`
                    rounded-xl
                    ${
                      filter.key === "overdue"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200"
                    }
                    `}
                  >
                    {filter.count}
                  </div>
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default TaskFilters;
