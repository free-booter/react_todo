import Login from "@/views/Login";
import Dashboard from "../views/Dashboard";
import Task from "../views/Task";

const routeConfig = [
  {
    path: "/",
    element: Login,
  },
  {
    path: "/task",
    element: Task,
  },
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    path: "/login",
    element: Login,
  },
];

export default routeConfig;
