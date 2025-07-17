import { Outlet } from "react-router-dom";
import Header from "../header";
import "./index.less";
export default function Main() {
  return (
    <div className="main-wrapper flex-1">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
