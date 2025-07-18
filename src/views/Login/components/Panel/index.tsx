import LoginForm from "../Form";
import "./index.less";

export default function LoginPanel() {
  return (
    <div className="login-panel">
      <div className="login-panel-title flex items-center">
        <h1>欢迎使用</h1>
        <span style={{ marginLeft: "10px", fontSize: "20px" }}>🎯</span>
      </div>
      <LoginForm />
    </div>
  );
}
