import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import "./account.css"; // Nhập file CSS để xử lý style

const AccountPage = () => {
  // Dữ liệu tài khoản hiện tại (lấy từ API và localStorage)
  const [userData, setUserData] = useState({
    id: "",
    userId: "",
    userName: "",
    password: "",
  });
  const userId = localStorage.getItem("userID");
  const username = localStorage.getItem("userName");
  const id = localStorage.getItem("id");
  const password = localStorage.getItem("password");
  const api = "https://66fce102c3a184a84d183d14.mockapi.io/Account"; // API URL
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Hàm lấy thông tin người dùng từ API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${api}/1`); // Thay "1" bằng id người dùng thực tế
        const data = await response.json();

        // Cập nhật dữ liệu từ API
        setUserData({
          id: data.id || localStorage.getItem("id"),
          userId: data.userId || localStorage.getItem("userId"),
          userName: data.userName || localStorage.getItem("userName"),
          password: data.password || localStorage.getItem("password"),
        });

        // Lưu vào localStorage
        localStorage.setItem("id", data.id);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("password", data.password);
      } catch (error) {
        message.error("Failed to load user data from API!");
      }
    };

    // Gọi hàm lấy dữ liệu người dùng
    fetchUserData();
  }, []);

  const handleFormSubmit = async (values) => {
    // Cập nhật thông tin vào localStorage
    localStorage.setItem("id", values.id);
    localStorage.setItem("userId", values.userId);
    localStorage.setItem("userName", values.userName);
    localStorage.setItem("password", values.password);
    localStorage.setItem("avatar", values.avatar); // Lưu avatar

    // Gửi dữ liệu đã chỉnh sửa lên API
    try {
      const response = await fetch(`${api}/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Account information updated successfully!");
        setUserData(values); // Cập nhật lại dữ liệu state
      } else {
        message.error("Failed to update user data!");
      }
    } catch (error) {
      message.error("Failed to update user data!");
    }
  };

  return (
    <Card
      title="Account Information"
      style={{
        maxWidth: 600,
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#FAFBFB",
      }} // Căn giữa nội dung
    >
      {/* Hiển thị biểu tượng avatar */}
      <div className="avatar-container">
        <UserOutlined className="avatar-icon" />
      </div>

      <Form
        name="account-form"
        layout="vertical"
        initialValues={userData}
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please input your ID!" }]}
        >
          <Input
            prefix={<IdcardOutlined />}
            placeholder="Enter your ID"
            value={id}
          />
        </Form.Item>

        <Form.Item
          label="User ID"
          name="userID"
          rules={[{ required: true, message: "Please input your User ID!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your User ID"
            value={userId}
          />
        </Form.Item>

        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your username"
            value={username}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            value={password}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting} block>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AccountPage;
