import SvgIcon from "@/components/SvgIcon";
import { Todo } from "../../type";
import "./index.less";
import TaskColumn from "./TaskColumn";
import { ReactNode } from "react";
import { useTaskContext } from "../../context";
function BoardView() {
  const { todoListMap } = useTaskContext();
  const todoList = todoListMap.todo.list || [];
  const inprogressList = todoListMap.inprogress.list || [];
  const doneList = todoListMap.done.list || [];

  const columns: {
    status: Todo["status"];
    title: string;
    icon: ReactNode;
    todos: Todo[];
  }[] = [
    {
      status: "todo",
      title: `待处理(${todoList.length})`,
      icon: <SvgIcon name="task-todo" color="#faad14" />,
      todos: todoList,
    },
    {
      status: "inprogress",
      title: `正在进行(${inprogressList.length})`,
      icon: <SvgIcon name="task-doing" color="#0958d9" />,
      todos: inprogressList,
    },
    {
      status: "done",
      title: `已完成(${doneList.length})`,
      icon: <SvgIcon name="task-check-circle" color="#52c41a" />,
      todos: doneList,
    },
  ];
  return (
    <div className="board-view">
      <div className="grid grid-cols-3 gap-x-10">
        {columns.map((col) => (
          <TaskColumn {...col} key={col.status} />
        ))}
      </div>
    </div>
  );
}

export default BoardView;
