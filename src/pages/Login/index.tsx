import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import "./index.scss";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <div className="login-bg">
      <div className="login-box">
        <div className="login-left"></div>
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
              <Button
                type="primary"
                htmlType="submit"
                block
                onClick={handleSubmit}
              >
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
