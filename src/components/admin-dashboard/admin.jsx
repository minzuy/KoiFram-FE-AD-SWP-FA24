import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, Space } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/admin/${key}`}>{label}</Link>,
  };
}

const items = [
  getItem("User", "user", <UserOutlined />),
  getItem("Fish", "fish", <ShoppingCartOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AdminHomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Lấy username từ localStorage
  const userName = localStorage.getItem("userName");

  // Điều hướng khi nhấn Logout
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token và user info khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
          }}
        >
          <Space>
            <div>
              <h2>Welcome, {userName}</h2>
            </div>
            <br></br>
            <div>
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Space>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Object</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          @FPTU HCM
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminHomePage;
