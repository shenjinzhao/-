import { Form, Input, Button, message, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { login } from "@/api/login";
import { LoginParams } from "@/api/login/type";

const Login = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const initialValues = {
    username: "admin",
    password: "a@111111",
  };
  const navigate = useNavigate();
  const handleSubmit = async (value: any) => {
    const params: LoginParams = {
      userCode: value.username,
      userPassword: value.password,
    };
    // e.preventDefault();
    const res = await login(params);
    if (res.code === 0) {
      messageApi
        .open({
          type: "success",
          content: "登录成功!",
          duration: 1,
        })
        .then(() => {
          navigate("/home");
        });
    }
  };
  return (
    <div className="login-bg">
      {contextHolder}
      <div className="login-box">
        <div className="login-left">
          <Image className="left-image" src={require("@/assets/left.png")} preview={false} />
        </div>
        <div className="login-right">
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            autoComplete="off"
            layout="vertical"
            className="login-form"
            form={form}
            initialValues={initialValues}
            onFinish={handleSubmit}
          >
            <div className="login-title">电子签章系统</div>
            <Form.Item
              label="账号:"
              name="username"
              rules={[{ required: true, message: "请输入账号!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入账号" />
            </Form.Item>
            <Form.Item
              label="密码:"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
