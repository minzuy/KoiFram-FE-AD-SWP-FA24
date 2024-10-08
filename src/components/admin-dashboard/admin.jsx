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
  MessageOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme, Button, Space } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFish,
  faStar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

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
  getItem("Business", "fish", <FontAwesomeIcon icon={faStar} />, [
    getItem(
      "Shop Home Page",
      "fish2",
      <FontAwesomeIcon icon={faCartShopping} />
    ),
    getItem("Fish list", "fish", <FontAwesomeIcon icon={faFish} />),
  ]),

  getItem("Order", "order", <ReconciliationTwoTone />),
  getItem("User feedback", "feedback", <CommentOutlined />),
  getItem("Account", "account", <UserOutlined />),
];

const AdminHomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState(null); // state theo dõi mục đã chọn
  const [isContentVisible, setIsContentVisible] = useState(true); // State để quản lý hiển thị
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Lấy username từ localStorage
  const userId = localStorage.getItem("userID");
  const username = localStorage.getItem("userName");

  // Điều hướng khi nhấn Logout
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleMenuClick = ({ key }) => {
    setSelectedMenuKey(key); // Cập nhật khi mục menu được chọn
    setIsContentVisible(false); // Ẩn đoạn nội dung khi có một mục menu được chọn
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
          onClick={handleMenuClick} // Bắt sự kiện khi bấm vào mục menu
          style={{
            backgroundColor: "#FAFBFB",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "#82CAFA",
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
              backgroundColor: "#FAFBFB",
            }}
          >
            <div className="admin-header">
              <UserOutlined />
              <h2>Welcome, {username}</h2>
            </div>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ fontWeight: "bold" }}
            >
              LOGOUT
            </Button>
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
            {isContentVisible && (
              <div className="content-paragraph">
                <p>
                  Welcome {username} to the Admin Panel ! Click on the left side
                  of the Sidebar to continue your business !
                </p>
                <br></br>
                <p>
                  Xin chào {username} ! Hãy nhấp vào thanh bên trái để tiếp tục
                  tác vụ của bạn !
                </p>
              </div>
            )}
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#005B9A",
            fontWeight: "bold",
            color: "#FAFBFB",
          }}
        >
          @FPTU HCM
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminHomePage;
