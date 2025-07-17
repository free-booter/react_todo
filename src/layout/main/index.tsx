import { Routes, Route } from "react-router-dom";
import Home from "../../views/Task";
import Dashboard from "../../views/Dashboard";
import Header from "../header";
import "./index.less";
export default function Main() {
  return (
    <div className="main-wrapper flex-1">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
