import { TaskStatus } from "@/views/Task/type";
import { Circle, CircleCheckBig, Zap } from "lucide-react";

export default function StatusIcon({
  type,
  size,
}: {
  type: TaskStatus;
  size: number;
}) {
  return (
    <>
      {type === "todo" && <Circle size={size} />}
      {type === "inprogress" && <Zap size={size} />}
      {type === "done" && <CircleCheckBig size={size} />}
    </>
  );
}
