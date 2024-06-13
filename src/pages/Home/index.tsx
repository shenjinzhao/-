import "./index.scss";
import { useMemo, useState } from "react";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { MenuItemType } from "antd/es/menu/interface";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
const siderMenu: MenuItem[] = [
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

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const judgeMenuItemType = (param: any): param is MenuItemType =>
  param.label && param.key;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  // https://zh-hans.react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  const toggleCollapsed = () => setCollapsed((v) => !v);

  const navigate = useNavigate();
  // 面包屑名称
  const [activeItem, setActiveItem] = useState("user");
  // 点击菜单
  const handleSiderClick: MenuProps["onClick"] = ({ key }) => {
    setActiveItem(key);
    // 路由跳转
    navigate(key);
  };
  // https://zh-hans.react.dev/reference/react/useMemo
  const title = useMemo(() => {
    const item = siderMenu.find((item) => item?.key === activeItem);
    return judgeMenuItemType(item) ? item.label : null;
  }, [activeItem]);
  return (
    <Layout>
      <Sider width={200} collapsed={collapsed}>
        <div className="logo">电子签章系统</div>
        <Menu
          theme={"dark"}
          mode="inline"
          defaultSelectedKeys={[activeItem]}
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
          <div className="active-item">{title}</div>
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
