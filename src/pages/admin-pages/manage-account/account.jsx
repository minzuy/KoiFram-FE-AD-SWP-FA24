import { Card } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import "./account.css"; // Nhập file CSS để xử lý style
import { useEffect, useState } from "react";

const AccountPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    role: "",
    token: "",
  });

  useEffect(() => {
    // Lấy thông tin từ localStorage khi trang load
    const storedUserData = {
      username: localStorage.getItem("userName"),
      name: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      token: localStorage.getItem("accessToken"),
    };

    setUserData(storedUserData);
  }, []);

  return (
    <Card
      title="Account Information"
      style={{
        maxWidth: 600,
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#FAFBFB",
      }}
    >
      <div className="avatar-container">
        <UserOutlined className="avatar-icon" />
      </div>

      <div className="account-details">
        <p>
          <IdcardOutlined /> <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <UserOutlined /> <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <SafetyCertificateOutlined /> <strong>Role:</strong> {userData.role}
        </p>
      </div>
    </Card>
  );
};

export default AccountPage;
