import React from "react";
import { Button, Input } from "antd";
import "./index.less";
import {
  BellOutlined,
  SettingOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function Header() {
  const { Search } = Input;
  return (
    <div className="header-wrapper flex items-center justify-between">
      <div className="header-left flex">
        <div className="header-title">Welcom</div>
        <div className="header-name">张三</div>
      </div>
      <div
        className="flex items-center gap-2 flex-1"
        style={{ margin: "0 20px" }}
      >
        <div className="header-search">
          <Input
            placeholder="请输入任务名称"
            prefix={<SearchOutlined />}
            style={{ width: "100%" }}
          />
        </div>
        <Button
          className="header-button"
          type="primary"
          icon={<PlusOutlined />}
        >
          task
        </Button>
      </div>
      <div className="header-other">
        <div className="header-other-item">
          <BellOutlined />
        </div>
        <div className="header-other-item">
          <SettingOutlined />
        </div>
      </div>
    </div>
  );
}
