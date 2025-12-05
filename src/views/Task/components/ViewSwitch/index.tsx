import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

export type ViewType = "list" | "board";

interface ViewSwitchProps {
  value: ViewType;
  onChange: (value: ViewType) => void;
}

function ViewSwitch({ value, onChange }: ViewSwitchProps) {
  return (
    <Segmented
      size="large"
      value={value}
      onChange={onChange as any}
      options={[
        { label: "列表", value: "list", icon: <BarsOutlined /> },
        { label: "看板", value: "board", icon: <AppstoreOutlined /> },
      ]}
    />
  );
}
export default ViewSwitch;
