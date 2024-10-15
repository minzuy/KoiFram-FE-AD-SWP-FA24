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
  const api = "http://api-koifish.evericks.com/api/auth/sign-in";
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setSubmitting(true);
    try {
      // Gửi yêu cầu POST với các thông tin cần thiết
      const response = await axios.post(api, values);

      // Lấy các thông tin cần lưu trữ từ phản hồi API
      const { accessToken, user } = response.data;
      const { username, name, role } = user;

      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem("accessToken", accessToken); // Lưu accessToken
      localStorage.setItem("userName", username); // Lưu username
      localStorage.setItem("name", name); // Lưu tên
      localStorage.setItem("role", role); // Lưu vai trò (role)

      if (role === "Customer") {
        navigate("/admin");
      } else {
        navigate("/login");
      }

      toast.success("Login Successful!");
    } catch (error) {
      toast.error("Invalid username or password");
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
            style={{ borderRadius: "10px" }}
          >
            <Form.Item
              label={<span style={{ color: "rgb(4, 57, 131)" }}>UserName</span>}
              name="username"
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
              style={{ margin: "0px 10px" }}
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
              style={{ margin: "0px 10px" }}
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
