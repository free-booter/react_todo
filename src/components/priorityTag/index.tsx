import { TaskPriority } from "@/views/Task/type";
import { Flag } from "lucide-react";

export default function PriorityTag({ type }: { type: TaskPriority }) {
  return (
    <>
      {/* {type === "" && (
        <div className="bg-gray-50 text-gray-500 border-gray-200 border-1px border-solid px-2 py-0.5 rounded-md flex items-center text-xs">
          <Flag size={12} />
          <span className="ml-1">无优先级</span>
        </div>
      )} */}
      {type === "low" && (
        <div className="bg-cyan-50 text-cyan-600 border-cyan-200 border-1px border-solid px-2 py-0.5 rounded-md flex items-center text-xs">
          <Flag size={12} />
          <span className="ml-1">低优先级</span>
        </div>
      )}
      {type === "medium" && (
        <div className="bg-orange-50 text-orange-600 border-orange-200 border-1px border-solid px-2 py-0.5 rounded-md flex items-center text-xs">
          <Flag size={12} />
          <span className="ml-1">中优先级</span>
        </div>
      )}
      {type === "high" && (
        <div className="bg-red-50 text-red-600 border-red-200 border-1px border-solid px-2 py-0.5 rounded-md flex items-center text-xs">
          <Flag size={12} />
          <span className="ml-1">高优先级</span>
        </div>
      )}
    </>
  );
}
