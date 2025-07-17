import { Button, Checkbox, Form, Input } from "antd";
import "./index.less";
import { Link } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
  code?: number;
  remember?: boolean;
};

export default function LoginForm() {
  return (
    <div className="login-form">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          rules={[{ required: true, message: "请输入邮箱!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <div className="flex justify-between items-center">
            <Checkbox>记住我</Checkbox>
            <Link to="/register">验证码登录</Link>
          </div>
        </Form.Item>

        <Form.Item label={null}>
          <Button className="w-full" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
        <Link to="/register">立即注册</Link>
      </Form>
    </div>
  );
}
