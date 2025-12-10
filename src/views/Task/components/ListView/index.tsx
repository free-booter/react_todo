import { useState, useMemo, useContext } from "react";
import { Empty, Spin, Tag, Dropdown, Modal, Button, Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useTaskStore } from "@/store/task";
import { Todo } from "../../type";
import { useTaskContext } from "../../context";
import StatusIcon from "@/components/statusIcon";
import PriorityTag from "@/components/priorityTag";
import { getOverdueDays } from "@/utils/formatDateDesc";
import { reqUpdateTodoStatus } from "@/services/api/home";
import { MessageContext } from "@/context/MessageContext";
import "./index.less";

function ListView() {
  const { todoListMap, loading, deleteTodo, getTaskAllList } = useTaskStore();
  const { openModal, onReorder } = useTaskContext();
  const [modal, modalContentHolder] = Modal.useModal();
  const messageApi = useContext(MessageContext)!;

  // 合并所有任务列表
  const allTasks = useMemo(() => {
    return [
      ...(todoListMap.todo.list || []),
      ...(todoListMap.inprogress.list || []),
      ...(todoListMap.done.list || []),
    ].sort((a, b) => (b.order || 0) - (a.order || 0));
  }, [todoListMap]);

  // 分页
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return allTasks.slice(start, start + pageSize);
  }, [allTasks, currentPage, pageSize]);

  // 拖拽状态
  const [draggedTask, setDraggedTask] = useState<Todo | null>(null);
  const [dragOverTask, setDragOverTask] = useState<Todo | null>(null);
  const [dropPosition, setDropPosition] = useState<"before" | "after" | null>(
    null
  );

  // 状态切换
  const handleStatusChange = async (record: Todo, e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus =
      record.status === "todo"
        ? "inprogress"
        : record.status === "inprogress"
        ? "done"
        : "todo";

    try {
      await reqUpdateTodoStatus({ id: record.id, status: newStatus });
      getTaskAllList();
      messageApi.success("状态更新成功");
    } catch (error) {
      messageApi.error("状态更新失败");
    }
  };

  // 删除任务
  const handleDelete = async (record: Todo) => {
    const confirm = await modal.confirm({
      title: "提示",
      content: "确定要删除吗？",
    });
    if (!confirm) return;

    try {
      await deleteTodo(record.id, record.status);
      messageApi.success("删除成功");
    } catch (error) {
      messageApi.error("删除失败");
    }
  };

  // 拖拽处理
  const handleDragStart = (e: React.DragEvent, record: Todo) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedTask(record);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverTask(null);
    setDropPosition(null);
  };

  const handleDragEnter = (e: React.DragEvent, record: Todo) => {
    if (draggedTask && draggedTask.id !== record.id) {
      setDragOverTask(record);
      const rect = e.currentTarget.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      setDropPosition(e.clientY < midY ? "before" : "after");
    }
  };

  const handleDragOver = (e: React.DragEvent, record: Todo) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedTask && draggedTask.id !== record.id) {
      const rect = e.currentTarget.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const position = e.clientY < midY ? "before" : "after";
      if (position !== dropPosition) setDropPosition(position);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetRecord: Todo) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.id === targetRecord.id) {
      setDraggedTask(null);
      setDragOverTask(null);
      setDropPosition(null);
      return;
    }

    try {
      await onReorder(draggedTask.id, targetRecord.id, targetRecord.status);
      messageApi.success("排序更新成功");
    } catch (error) {
      messageApi.error("排序更新失败");
    } finally {
      setDraggedTask(null);
      setDragOverTask(null);
      setDropPosition(null);
    }
  };

  const getRowClassName = (record: Todo) => {
    const classes = ["task-list-row"];
    if (record.id === draggedTask?.id) classes.push("dragging");
    if (record.id === dragOverTask?.id) {
      classes.push("drag-over");
      if (dropPosition === "before") classes.push("drop-before");
      if (dropPosition === "after") classes.push("drop-after");
    }
    // 逾期优先级最高，如果逾期就不显示优先级样式
    if (record.isOverdue) {
      classes.push("overdue");
    } else if (record.priority === "high") {
      classes.push("priority-high");
    } else if (record.priority === "medium") {
      classes.push("priority-medium");
    } else if (record.priority === "low") {
      classes.push("priority-low");
    }
    if (record.status === "done") classes.push("done");
    return classes.join(" ");
  };

  return (
    <div className="custom-list-view">
      {modalContentHolder}
      <Spin spinning={loading}>
        {paginatedTasks.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无任务" />
        ) : (
          <>
            <div className="list-body">
              {paginatedTasks.map((task) => (
                <div
                  key={task.id}
                  className={getRowClassName(task)}
                  onDragOver={(e) => handleDragOver(e, task)}
                  onDragEnter={(e) => handleDragEnter(e, task)}
                  onDrop={(e) => handleDrop(e, task)}
                >
                  {/* 拖拽手柄 */}
                  <div className="drag-handle-wrapper">
                    <div
                      className="drag-handle"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                      title="拖动排序"
                    >
                      <HolderOutlined />
                    </div>
                  </div>

                  {/* 主内容 */}
                  <div
                    className="main-content"
                    onClick={() => openModal("view", task)}
                  >
                    <div className="row-top">
                      <div
                        className={`task-title ${
                          task.status === "done" ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </div>
                      {task.tags && task.tags.length > 0 && (
                        <div className="tags-wrapper">
                          {task.tags.slice(0, 2).map((tag) => (
                            <Tag key={tag.id} color="default">
                              {tag.name}
                            </Tag>
                          ))}
                          {task.tags.length > 2 && (
                            <Tag color="default">+{task.tags.length - 2}</Tag>
                          )}
                        </div>
                      )}
                    </div>

                    {task.description && (
                      <div className="task-desc">{task.description}</div>
                    )}

                    <div className="row-meta">
                      <div
                        className="meta-item status-badge"
                        onClick={(e) => handleStatusChange(task, e)}
                      >
                        <StatusIcon type={task.status} size={14} />
                        <span>
                          {task.status === "todo"
                            ? "待处理"
                            : task.status === "inprogress"
                            ? "进行中"
                            : "已完成"}
                        </span>
                      </div>

                      {task.dateType !== "none" && task.dueDate && (
                        <div
                          className={`meta-item date-info ${
                            task.isOverdue ? "overdue" : ""
                          }`}
                        >
                          <Calendar size={14} />
                          <span>
                            {task.dateType === "range"
                              ? `${task.startDate} - ${task.dueDate}`
                              : task.dueDate}
                          </span>
                          {task.isOverdue && (
                            <Tag color="error" style={{ marginLeft: 4 }}>
                              逾期{getOverdueDays(task.dueDate)}天
                            </Tag>
                          )}
                        </div>
                      )}

                      <div className="meta-item">
                        创建于 {dayjs(task.createdAt).format("MM-DD HH:mm")}
                      </div>
                    </div>
                  </div>

                  {/* 右侧信息 */}
                  <div className="side-info">
                    <div className="priority-wrapper">
                      <PriorityTag type={task.priority} />
                    </div>
                    <div className="actions-wrapper">
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "edit",
                              label: "编辑",
                              icon: <EditOutlined />,
                              disabled: task.status === "done",
                              onClick: () => openModal("edit", task),
                            },
                            {
                              key: "delete",
                              label: "删除",
                              danger: true,
                              icon: <DeleteOutlined />,
                              onClick: () => handleDelete(task),
                            },
                          ],
                        }}
                        trigger={["click"]}
                      >
                        <Button
                          type="text"
                          icon={<EllipsisOutlined />}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="list-footer">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={allTasks.length}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条任务`}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                pageSizeOptions={[10, 20, 50, 100]}
              />
            </div>
          </>
        )}
      </Spin>
    </div>
  );
}

export default ListView;
