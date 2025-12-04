import { Button, Input } from "antd";
import "./index.less";
import { BellOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import useUserStore, { UserState } from "@/store/user";
import HeaderDropdown from "./dropdown";
import TaskModal from "@/components/TaskFormModal";
import { useState } from "react";
import { SearchProps } from "antd/es/input";
import { useTaskStore } from "@/store/task";

export default function Header() {
  const { userInfo } = useUserStore() as UserState;
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const { getTaskAllList } = useTaskStore();
  const handleSearch: SearchProps["onSearch"] = (value) => {
    getTaskAllList({
      keyword: value,
    });
  };
  return (
    <>
      <div className="header-wrapper flex items-center justify-between">
        <div className="header-left flex flex-col">
          <div className="header-title">下午好👋</div>
          <div className="header-name">{userInfo?.username}</div>
        </div>
        <div
          className="flex items-center gap-2 flex-1"
          style={{ margin: "0 20px" }}
        >
          <div className="header-search">
            <Input.Search
              placeholder="请输入任务名称"
              style={{ width: "100%" }}
              size="large"
              allowClear
              onSearch={handleSearch}
            />
          </div>
          <Button
            className="header-button"
            type="primary"
            icon={<PlusOutlined />}
            onClick={openModal}
          >
            新增任务
          </Button>
        </div>
        <div className="header-other">
          <div className="header-other-item">
            <BellOutlined />
          </div>
          <div className="header-other-item">
            <SettingOutlined />
          </div>
          <HeaderDropdown />
        </div>
      </div>
      <TaskModal
        type="add"
        open={open}
        close={() => setOpen(false)}
        status={"todo"}
      />
    </>
  );
}
