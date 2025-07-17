import LoginForm from "../Form";
import "./index.less";

export default function LoginPanel() {
  return (
    <div className="login-panel">
      <div className="login-panel-title">
        <h1>欢迎使用</h1>
      </div>
      <LoginForm />
    </div>
  );
}
