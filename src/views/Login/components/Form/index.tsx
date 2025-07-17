import { Button, Checkbox, Form, Input, message } from "antd";
import "./index.less";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

type FieldType = {
  email?: string;
  password?: string;
  code?: number;
  remember?: boolean;
};

export default function LoginForm() {

  const [isCodeLogin, setIsCodeLogin] = useState(true);
  // 处理倒计时
  const [countdown, setCountdown] = useState(0);
  const handleSendCode = async () => {
    // 触发邮箱校验
    const { error } = await useForm.validateFields(["email"]);
    if (error) return;

    if (countdown === 0) {
      setCountdown(60);
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCountdown(0);
    }
  }, [countdown]);
  // 处理登录
  const [useForm] = Form.useForm();
  const handleLogin = () => {
    console.log("登录", useForm.getFieldsValue());
  };

  return (
    <div className="login-form">
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={useForm}
        onFinish={handleLogin}
      >
        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱!" },
            { type: "email", message: "请输入正确的邮箱!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
        </Form.Item>

        {
          isCodeLogin ? (
            <Form.Item<FieldType>
              label="验证码"
              name="code"
              rules={[
                { required: true, message: "请输入验证码!" },
                { min: 6, message: "验证码长度不能小于6位!" },
              ]}
            >
              <div className="flex items-center">
                <Input prefix={<LockOutlined />} placeholder="请输入验证码" />
                <Button className="ml-2" onClick={handleSendCode}>{countdown > 0 ? `${countdown}s后重新获取` : "获取验证码"}</Button>
              </div>
            </Form.Item>
          ) : (
            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 6, message: "密码长度不能小于6位!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>
          )
        }


        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <div className="flex justify-between items-center">
            <Checkbox>记住我</Checkbox>
            <Button type="link" onClick={() => setIsCodeLogin(!isCodeLogin)} style={{ color: "#6200ea" }}>
              {isCodeLogin ? "密码登录" : "验证码登录"}
            </Button>
          </div>
        </Form.Item>

        <Form.Item label={null}>
          <Button className="w-full" type="primary" htmlType="submit">
            {
              isCodeLogin ? "登录 / 注册" : "登录"
            }
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
