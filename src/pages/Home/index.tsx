import "./index.scss";
import { useMemo, useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AuditOutlined,
  VerifiedOutlined,
  CloudUploadOutlined,
  PoweroffOutlined
} from "@ant-design/icons";
import { MenuProps, message } from "antd";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { MenuItemType } from "antd/es/menu/interface";
import { logout } from "@/api/login/index";

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
const siderMenu: MenuItem[] = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "用户管理",
  },
  {
    key: "sealApply",
    icon: <CloudUploadOutlined />,
    label: "印章申请管理",
  },
  {
    key: "sealApproval",
    icon: <CloudUploadOutlined />,
    label: "印章申请审批",
  },
  {
    key: "sealMake",
    icon: <AuditOutlined />,
    label: "印章制作",
  },
  {
    key: "seal",
    icon: <AuditOutlined />,
    label: "印章管理",
  },
  {
    key: "sealType",
    icon: <AuditOutlined />,
    label: "印章类型管理",
  },
  {
    key: "cert",
    icon: <VerifiedOutlined />,
    label: "证书管理",
  },
];

const judgeMenuItemType = (param: any): param is MenuItemType =>
  param.label && param.key;

const Home = () => {
  const location = useLocation();
  // DATA
  // 控制侧边栏是否收缩
  const [collapsed, setCollapsed] = useState(false);
  // 信息提示
  const [messageApi, contextHolder] = message.useMessage();
  // 设置侧边栏展开或收缩函数
  const toggleCollapsed = () => setCollapsed((v) => !v);
  // 路由跳转
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  // 面包屑名称
  const [activeItem, setActiveItem] = useState("user");

  // Function
  useEffect(() => {
    const url = location.pathname.split('/').pop();
    setSelectedKeys([url || '']);
    setActiveItem(url || '');
  },[location])
  // 点击菜单
  const handleSiderClick: MenuProps["onClick"] = ({ key }) => {
    setActiveItem(key);
    // 路由跳转
    navigate(key);
  };
  // 菜单名称
  const title = useMemo(() => {
    const item = siderMenu.find((item) => item?.key === activeItem);
    return judgeMenuItemType(item) ? item.label : null;
  }, [activeItem]);
  // 登录请求
  const logoutReq = async () => {
    const res = await logout({});
    if (res.code === 0) {
      messageApi.open({
        type: "success",
        content: "退出成功!",
        duration: 1,
      }).then(() => {
        navigate("/login");
      })
    }
  }
  return (
    <Layout className="home-bg">
      {/* 消息提示 */}
      {contextHolder}
      {/* 侧边栏 */}
      <Sider width={200} collapsed={collapsed}>
        {/* 标题 */}
        <div className="logo">{collapsed ? '签' : '电子签章系统'}</div>
        {/* 菜单栏 */}
        <Menu
          theme={"dark"}
          mode="inline"
          defaultSelectedKeys={[activeItem]}
          selectedKeys={selectedKeys}
          style={{ height: "100%", borderRight: 0 }}
          items={siderMenu}
          onClick={handleSiderClick}
        />
      </Sider>
      <Layout>
        {/* 头部 */}
        <Header className="header">
          {/* 切换侧边栏按钮 */}
          <Button
            className="collapsedBtn"
            type="text"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          {/* 右侧用户部分 */}
          <div className="user-box">
            {/* 退出 */}
            <Button shape="circle" icon={<PoweroffOutlined />} onClick={logoutReq} />
          </div>
        </Header>
        {/* 面包屑部分 */}
        <div className="bread-box">
          {/* 当前菜单名称 */}
          <div className="active-item">{title}</div>
          {/* 当前路由地址 */}
          <Breadcrumb
            items={[
              {
                title: "home",
              },
              {
                title: activeItem,
              },
            ]}
          />
        </div>
        {/* 菜单对应的页面内容 */}
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
