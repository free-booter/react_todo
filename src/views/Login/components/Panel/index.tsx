import LoginForm from "../Form";
import "./index.less";

export default function LoginPanel() {
  return (
    <div className="login-panel">
      <div className="login-panel-title">
        <h1>欢迎使用</h1>
        <p>请先登录</p>
      </div>
      <LoginForm />
    </div>
  );
}
