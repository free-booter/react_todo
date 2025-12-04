import { Button, Checkbox, Form, Input } from "antd";
import "./index.less";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { reqLogin, reqSendCode } from "@/services/api/login";
import { useNavigate } from "react-router";
import useUserStore, { UserState } from "@/store/user";
import { localCache } from "@/utils/cache";
import { MessageContext } from "@/context/MessageContext";

type FieldType = {
  email?: string;
  password?: string;
  code?: number;
  remember?: boolean;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const messageApi = useContext(MessageContext)!;
  const [isCodeLogin, setIsCodeLogin] = useState(true);
  // 处理登录类型
  const handleChangeLoginType = () => {
    // 清除验证码和密码输入框以及校验
    useForm.resetFields(["code", "password"]);
    setIsCodeLogin(!isCodeLogin);
  };
  // 处理倒计时
  const [countdown, setCountdown] = useState(0);
  const handleSendCode = async () => {
    // 触发邮箱校验
    const { error } = await useForm.validateFields(["email"]);
    if (error) return;
    if (countdown !== 0) return;

    reqSendCode({ email: useForm.getFieldValue("email") }).then(() => {
      messageApi.success("已发送验证码");
      if (countdown === 0) {
        setCountdown(60);
      }
    });
  };
  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCountdown(0);
    }
  }, [countdown]);
  useEffect(() => {
    const loginForm = localCache.getCache("loginForm");
    if (loginForm) {
      const { email, password, type } = loginForm;
      useForm.setFieldsValue({
        email,
        password,
        remember: true,
      });
      setIsCodeLogin(type);
    }
  }, []);
  const handleRemember = () => {
    if (!useForm.getFieldValue("remember")) {
      localCache.deleteCache("loginForm");
      return;
    }
    localCache.setCache("loginForm", {
      type: isCodeLogin,
      email: useForm.getFieldValue("email"),
      password: useForm.getFieldValue("password"),
      code: useForm.getFieldValue("code")
        ? Number(useForm.getFieldValue("code"))
        : undefined,
    });
  };
  // 处理登录
  const [useForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setUserInfo, setToken } = useUserStore() as UserState;
  const handleLogin = () => {
    setLoading(true);
    reqLogin({
      email: useForm.getFieldValue("email"),
      password: useForm.getFieldValue("password"),
    })
      .then((res) => {
        handleRemember();
        messageApi.success("登录成功");
        setUserInfo(res.userInfo);
        setToken(res.token);
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
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
          <Input
            prefix={<MailOutlined style={{ color: "#6200ea" }} />}
            placeholder="请输入邮箱"
          />
        </Form.Item>

        {isCodeLogin ? (
          <Form.Item<FieldType>
            label="验证码"
            name="code"
            rules={[
              { required: true, message: "请输入验证码!" },
              { min: 6, message: "验证码长度不能小于6位!" },
            ]}
          >
            <div className="flex items-center">
              <Input
                prefix={<LockOutlined style={{ color: "#6200ea" }} />}
                placeholder="请输入验证码"
              />
              <Button
                className="ml-2"
                onClick={handleSendCode}
                style={{ color: "#6200ea" }}
              >
                {countdown > 0 ? `${countdown}s后重新获取` : "获取验证码"}
              </Button>
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
            <Input.Password
              prefix={<LockOutlined style={{ color: "#6200ea" }} />}
              placeholder="请输入密码"
            />
          </Form.Item>
        )}

        <Form.Item label={null}>
          <div className="flex justify-between items-center">
            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Button
              type="link"
              onClick={handleChangeLoginType}
              style={{ color: "#6200ea" }}
            >
              {isCodeLogin ? "密码登录" : "验证码登录"}
            </Button>
          </div>
        </Form.Item>

        <Form.Item label={null}>
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {isCodeLogin ? "登录 / 注册" : "登录"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
