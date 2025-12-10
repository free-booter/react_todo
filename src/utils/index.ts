import { Todo } from "@/types/task";

export const getPriorityBadgeColor = (priority: Todo["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-50 border-red-3 hover:border-red-5";
    case "medium":
      return "bg-orange-50  border-orange-3 hover:border-orange-5";
    case "low":
      return "bg-cyan-50  border-cyan-3 hover:border-cyan-5";
  }
};
