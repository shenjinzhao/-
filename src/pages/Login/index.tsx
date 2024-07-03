import { Form, Input, Button, message, Image } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { login } from '@/api/login'
import { LoginParams } from '@/api/login/type'
import leftImage from '@/assets/left.png'
import style from './index.module.scss'
import cx from 'classnames'
const Login = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const initialValues = {
    username: 'admin',
    password: 'a@111111'
  }
  const navigate = useNavigate()
  const handleSubmit = async (value: any) => {
    const params: LoginParams = {
      userCode: value.username,
      userPassword: value.password
    }
    // e.preventDefault();
    await login(params)
    messageApi
      .open({
        type: 'success',
        content: '登录成功!',
        duration: 1
      })
      .then(() => {
        navigate('/home')
      })
  }
  return (
    <div className={style['login-bg']}>
      {contextHolder}
      <div className={style['login-box']}>
        <div className={style['login-left']}>
          <Image className={style['left-image']} preview={false} src={leftImage} />
        </div>
        <div className={style['login-right']}>
          <Form
            autoComplete="off"
            className={cx(style['login-form'], 'max-w-[600px]')}
            form={form}
            initialValues={initialValues}
            labelCol={{
              span: 8
            }}
            layout="vertical"
            onFinish={handleSubmit}
            wrapperCol={{
              span: 16
            }}>
            <div className={style['login-title']}>电子签章系统</div>
            <Form.Item
              label="账号:"
              name="username"
              rules={[{ required: true, message: '请输入账号!' }]}>
              <Input placeholder="请输入账号" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="密码:"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}>
              <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button block htmlType="submit" type="primary">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Login
