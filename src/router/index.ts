import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import Task from "@/views/Task";
import Layout from "@/layout";
import { createBrowserRouter, redirect } from "react-router";

const routeConfig = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true, // 默认子路由
        loader: () => redirect("/task"),
      },
      { path: "dashboard", Component: Dashboard },
      { path: "task", Component: Task },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);

export default routeConfig;
