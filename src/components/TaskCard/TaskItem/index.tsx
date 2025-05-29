import SvgIcon from "@/components/SvgIcon";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Checkbox, Dropdown, MenuProps, Tag, Tooltip } from "antd";
import "./index.less";

export default function TaskItem() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>编辑</span>,
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: <span>删除</span>,
      danger: true,
      icon: <DeleteOutlined />,
    },
  ];
  return (
    <div className="task-item">
      <div className="task-item__header flex items-center">
        <div className="task-item__flag todo">
          <SvgIcon size={20} name="task-flag-fill" />
        </div>
        <Checkbox className="mr-5"></Checkbox>
        <div className="task-item__more">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="task-item__content">
        <div className="task-item__title">
          <span>学习react基础语法</span>
        </div>
        <Tooltip title="学习react基础语法，包括组件、状态、事件等。学会自己封装组件。使用antd组件库。自己写一个项目。并将其记录到github上。顺便可以学习下typescript。">
          <div className="task-item__description">
            学习react基础语法，包括组件、状态、事件等。学会自己封装组件。使用antd组件库。自己写一个项目。并将其记录到github上。顺便可以学习下typescript。
          </div>
        </Tooltip>
      </div>
      <div className="task-item__footer">
        <div className="task-item__tags">
          <Tag color="blue">学习</Tag>
          <Tag color="green">前端</Tag>
          <Tag color="red">vue</Tag>
        </div>
        <div className="task-item__date">
          <ClockCircleOutlined />
          <span style={{ marginLeft: 5 }} className="whitespace-nowrap">
            2025-05-29
          </span>
        </div>
      </div>
    </div>
  );
}
