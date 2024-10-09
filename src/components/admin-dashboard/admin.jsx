import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  ReconciliationTwoTone,
  IdcardOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, Space } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import vidPg from "../images-vid/koi3D.mp4";

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
  getItem("Users", "user", <IdcardOutlined />),
  getItem("Fish", "fish", <ShoppingCartOutlined />),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Staff", "register", <DesktopOutlined />),
  getItem("Order", "order", <ReconciliationTwoTone />),
  getItem("Account", "account", <UserOutlined />),
];

const AdminHomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Lấy username từ localStorage
  const userId = localStorage.getItem("userID");
  const username = localStorage.getItem("userName");

  // Điều hướng khi nhấn Logout
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token và user info khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

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
        style={{
          backgroundColor: "#FAFBFB",
          color: "#FAFBFB",
          borderRight: "2px solid rgb(22, 119, 255)",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{
            backgroundColor: "#FAFBFB",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "#002140",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 0,
          }}
        >
          <Space
            style={{
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              backgroundColor: "#F28705",
            }}
          >
            <div className="admin-header">
              <h2>Welcome, {username}</h2>
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
        <Content className="admin-content">
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <video autoPlay muted loop className="background-video">
              <source src={vidPg} type="video/mp4" />
            </video>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#F28705",
            fontWeight: "bold",
            color: "white",
          }}
        >
          @FPTU HCM
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminHomePage;
