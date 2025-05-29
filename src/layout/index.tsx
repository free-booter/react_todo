import Sidebar from "./sidebar";
import Main from "./main";
import "./index.less";
export default function Layout() {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <Main />
    </div>
  );
}
