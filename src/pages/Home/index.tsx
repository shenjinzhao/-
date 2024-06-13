import "./index.scss";

import { useState } from "react";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const siderMenu: MenuProps["items"] = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "用户管理",
  },
  {
    key: "seal",
    icon: <AuditOutlined />,
    label: "印章管理",
  },
];
const Home = () => {
  const [activeItem, setActiveItem] = useState('用户管理');
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  const navigate = useNavigate();
  // 面包屑名称
  const [breadcrumbName, setBreadcrumbName] = useState("user");
  // 点击菜单
  const handleSiderClick: MenuProps["onClick"] = ({ key, keyPath }) => {
    setBreadcrumbName(key);
    siderMenu.forEach(el => {
      if(el?.key == key) {
        setActiveItem(el.label);
      }
    })
    // 路由跳转
    navigate(key);
  };
  return (
    <Layout>
      <Sider width={200} collapsed={collapsed}>
        <div className="logo">电子签章系统</div>
        <Menu
          theme={"dark"}
          mode="inline"
          defaultSelectedKeys={["user"]}
          style={{ height: "100%", borderRight: 0 }}
          items={siderMenu}
          onClick={handleSiderClick}
        />
      </Sider>
      <Layout>
        <Header className="header">
          <Button
            className="collapsedBtn"
            type="text"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <div className="bread-box">
          <div className="active-item">{activeItem}</div>
          <Breadcrumb
            items={[
              {
                title: "home",
              },
              {
                title: breadcrumbName,
              },
            ]}
          />
        </div>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
