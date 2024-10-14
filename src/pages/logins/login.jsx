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
      const response = await axios.post(api, {
        username: values.username,
        password: values.password,
        name: values.name, // thêm tên từ form
        phone: values.phone, // thêm số điện thoại từ form
        address: values.address, // thêm địa chỉ từ form
        role: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // roleId là cố định
      });

      const { name, roleId, token } = response.data;

      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name); // Lưu name
      localStorage.setItem("roleId", roleId); // Lưu roleId

      navigate("/admin");

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
