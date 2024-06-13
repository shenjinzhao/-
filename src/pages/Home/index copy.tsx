import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useNavigate, useRoutes } from "react-router-dom";
import routes from "@/routes/index";
const { Header, Content, Footer, Sider } = Layout;
const siderMenu: MenuProps["items"] = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "人员管理",
  },
];
const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // 获得路由表
  const routeView = useRoutes(routes);
  const navigate = useNavigate();
  // 面包屑名称
  const [breadcrumbName, setBreadcrumbName] = useState("user");
  // 点击菜单
  const handleSiderClick: MenuProps["onClick"] = ({ key, keyPath }) => {
    const name = keyPath.reverse().join("/") || "";
    setBreadcrumbName(name);
    if (key !== "user") return;
    // 路由跳转
    navigate(key, {
      replace: false,
      state: {
        id: key,
      },
    });
  };
  return (
    <Layout>
      <Header className="header">
        电子签章系统
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={siderMenu}
            onClick={handleSiderClick}
          />
        </Sider>
        <Layout>
          <div style={{ margin: "16px 0" }}>{breadcrumbName}</div>

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {routeView}
          </Content>
        </Layout>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}
export default Home;