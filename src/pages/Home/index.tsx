import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AuditOutlined,
  VerifiedOutlined,
  CloudUploadOutlined,
  PoweroffOutlined
} from '@ant-design/icons'
import { MenuProps, message } from 'antd'
import { Layout, Menu, Button, Breadcrumb } from 'antd'
import { useNavigate, Outlet } from 'react-router-dom'
import { MenuItemType } from 'antd/es/menu/interface'
import { logout } from '@/api/login/index'
import style from './index.module.scss'

const { Header, Content, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]
const siderMenu: MenuItem[] = [
  {
    key: 'user',
    icon: <UserOutlined />,
    label: '用户管理'
  },
  {
    key: 'sealApply',
    icon: <CloudUploadOutlined />,
    label: '印章申请管理'
  },
  {
    key: 'sealApproval',
    icon: <CloudUploadOutlined />,
    label: '印章申请审批'
  },
  {
    key: 'sealMake',
    icon: <AuditOutlined />,
    label: '印章制作'
  },
  {
    key: 'seal',
    icon: <AuditOutlined />,
    label: '印章管理'
  },
  {
    key: 'sealType',
    icon: <AuditOutlined />,
    label: '印章类型管理'
  },
  {
    key: 'cert',
    icon: <VerifiedOutlined />,
    label: '证书管理'
  }
]

const judgeMenuItemType = (param: any): param is MenuItemType => param.label && param.key

const Home = () => {
  const location = useLocation()
  // DATA
  // 控制侧边栏是否收缩
  const [collapsed, setCollapsed] = useState(false)
  // 信息提示
  const [messageApi, contextHolder] = message.useMessage()
  // 设置侧边栏展开或收缩函数
  const toggleCollapsed = () => setCollapsed((v) => !v)
  // 路由跳转
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
  // 面包屑名称
  const [activeItem, setActiveItem] = useState('user')

  // Function
  useEffect(() => {
    const url = location.pathname.split('/').pop()
    setSelectedKeys([url || ''])
    setActiveItem(url || '')
  }, [location])
  // 点击菜单
  const handleSiderClick: MenuProps['onClick'] = ({ key }) => {
    setActiveItem(key)
    // 路由跳转
    navigate(key)
  }
  // 菜单名称
  const title = useMemo(() => {
    const item = siderMenu.find((item) => item?.key === activeItem)
    return judgeMenuItemType(item) ? item.label : null
  }, [activeItem])
  // 登录请求
  const logoutReq = async () => {
    await logout()
    messageApi
      .open({
        type: 'success',
        content: '退出成功!',
        duration: 1
      })
      .then(() => {
        navigate('/login')
      })
  }
  return (
    <Layout className={style['home-bg']}>
      {/* 消息提示 */}
      {contextHolder}
      {/* 侧边栏 */}
      <Sider collapsed={collapsed} width={200}>
        {/* 标题 */}
        <div className={style['logo']}>{collapsed ? '签' : '电子签章系统'}</div>
        {/* 菜单栏 */}
        <Menu
          className="h-full border-r-0"
          defaultSelectedKeys={[activeItem]}
          items={siderMenu}
          mode="inline"
          onClick={handleSiderClick}
          selectedKeys={selectedKeys}
          theme={'dark'}
        />
      </Sider>
      <Layout>
        {/* 头部 */}
        <Header className={style['header']}>
          {/* 切换侧边栏按钮 */}
          <Button className={style['collapsedBtn']} onClick={toggleCollapsed} type="text">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          {/* 右侧用户部分 */}
          <div className={style['user-box']}>
            {/* 退出 */}
            <Button icon={<PoweroffOutlined />} onClick={logoutReq} shape="circle" />
          </div>
        </Header>
        {/* 面包屑部分 */}
        <div className={style['bread-box']}>
          {/* 当前菜单名称 */}
          <div className={style['active-item']}>{title}</div>
          {/* 当前路由地址 */}
          <Breadcrumb
            items={[
              {
                title: 'home'
              },
              {
                title: activeItem
              }
            ]}
          />
        </div>
        {/* 菜单对应的页面内容 */}
        <Content className={style['content']}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default Home
