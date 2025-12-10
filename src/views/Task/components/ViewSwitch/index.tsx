import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import "./index.less";

export type ViewType = "List" | "Kanban";

interface ViewSwitchProps {
  value: ViewType;
  onChange: (value: ViewType) => void;
}

function ViewSwitch({ value, onChange }: ViewSwitchProps) {
  const handleClick = (optionValue: ViewType) => {
    if (optionValue !== value) {
      onChange(optionValue);
    }
  };

  const isKanban = value === "Kanban";

  return (
    <div className="view-switch">
      <div
        className={`view-switch__indicator ${
          isKanban
            ? "view-switch__indicator--left"
            : "view-switch__indicator--right"
        }`}
      />
      <button
        type="button"
        className={`view-switch__item ${
          isKanban ? "view-switch__item--active" : ""
        }`}
        onClick={() => handleClick("Kanban")}
      >
        <span className="view-switch__icon">
          <AppstoreOutlined />
        </span>
        <span className="view-switch__label">看板</span>
      </button>
      <button
        type="button"
        className={`view-switch__item ${
          !isKanban ? "view-switch__item--active" : ""
        }`}
        onClick={() => handleClick("List")}
      >
        <span className="view-switch__icon">
          <BarsOutlined />
        </span>
        <span className="view-switch__label">列表</span>
      </button>
    </div>
  );
}

export default ViewSwitch;
