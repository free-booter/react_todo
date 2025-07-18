import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import useUserStore, { UserState } from "@/store/user";

export default function HeaderDropdown() {
  const { userInfo } = useUserStore() as UserState;
  const items = [
    {
      key: "profile",
      label: "个人中心",
    },
    {
      key: "logout",
      label: "退出登录",
    },
  ];
  return (
    <div className="header-dropdown">
      <Dropdown menu={{ items }}>
        <Avatar
          className="cursor-pointer"
          src={<img src={userInfo?.avatar} alt="avatar" />}
        />
      </Dropdown>
    </div>
  );
}
