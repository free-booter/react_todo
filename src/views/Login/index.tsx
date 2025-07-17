import "./index.less";
import todoList from "@/assets/images/login/todoList.svg";
import LoginPanel from "./components/Panel";

function Login() {
  return (
    <div className="login-page flex">
      <div className="login-left">
        <img src={todoList} alt="" />
        <div className="login-left-text">
          <h1>开启你的高效之旅</h1>
          <p>
            一款简单易用的任务管理工具，帮助你保持组织和高效。
          </p>
        </div>
      </div>
      <div className="login-right">
        <LoginPanel />
      </div>
    </div>
  );
}

export default Login;
