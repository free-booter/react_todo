import "./index.less";
import todoList from "@/assets/images/login/todoList.svg";
import LoginPanel from "./components/Panel";

function Login() {
  return (
    <div className="login-page flex">
      <div className="login-left">
        <img src={todoList} alt="" />
      </div>
      <div className="login-right">
        <LoginPanel />
      </div>
    </div>
  );
}

export default Login;
