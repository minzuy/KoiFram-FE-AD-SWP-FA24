import { Button, Form, Input } from "antd";
import AuthenTemplate from "../../components/authentification/authen";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css"; // Import file CSS

function LoginPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const api = "https://66fce102c3a184a84d183d14.mockapi.io/Account";
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setSubmitting(true);
    try {
      // Gửi yêu cầu POST với userId và password
      const response = await axios.post(api, {
        userID: values.userId,
        password: values.password,
      });

      const { userID, roleId, token } = response.data;

      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID); // Lưu userID
      localStorage.setItem("roleId", roleId); // Lưu roleId

      // Điều hướng dựa trên roleId
      if (roleId === "ADMIN" || roleId === "MANAGER") {
        navigate("/admin");
      } else {
        navigate("/admin");
      }

      toast.success("Login Successful!");
    } catch (error) {
      toast.error("Invalid user ID or password");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthenTemplate>
      {/* Thêm video nền */}
      <div className="login-container">
        <video autoPlay muted loop className="background-video">
          <source src="../../vid.mp4" type="video/mp4" />
        </video>
        <div className="login-form">
          <h1>Login Form</h1>
          <Form
            labelCol={{
              span: 24,
            }}
            confirmLoading={submitting}
            onFinish={handleLogin}
          >
            <Form.Item
              label={<span style={{ color: "rgb(4, 57, 131)" }}>UserID</span>}
              name="userId"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{ color: "rgb(242, 135, 5)", fontWeight: "bold" }}
                    >
                      YOU MUST INPUT YOUR USER ID
                    </span>
                  ),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your userID"
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "rgb(4, 57, 131)" }}>Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: (
                    <span
                      style={{
                        color: "rgb(242, 135, 5)",
                        fontWeight: "bold,",
                      }}
                    >
                      YOU MUST INPUT YOUR PASSWORD
                    </span>
                  ),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={submitting}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </AuthenTemplate>
  );
}

export default LoginPage;
