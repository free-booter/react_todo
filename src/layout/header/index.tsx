import { Button, Input } from "antd";
import "./index.less";
import {
  BellOutlined,
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useUserStore, { UserState } from "@/store/user";
import HeaderDropdown from "./dropdown";

export default function Header() {
  const { userInfo } = useUserStore() as UserState;

  return (
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
          <Input
            placeholder="请输入任务名称"
            prefix={<SearchOutlined style={{ color: "#6200ea" }} />}
            style={{ width: "100%" }}
          />
        </div>
        <Button
          className="header-button"
          type="primary"
          icon={<PlusOutlined />}
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
  );
}
