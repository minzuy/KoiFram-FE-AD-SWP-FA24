import { Button, Form, Input } from "antd";
import AuthenTemplate from "../../components/authentification/authen";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const api = "https://66fce102c3a184a84d183d14.mockapi.io/Account";

  const handleLogin = async (values) => {
    setSubmitting(true);
    try {
      // Fetch all users from the API
      const response = await axios.get(api);
      const users = response.data;

      // Find the user that matches the entered userId and password
      const user = users.find(
        (u) => u.userID === values.userId && u.password === values.password
      );

      if (user) {
        // Nếu user tìm thấy, lưu token và điều hướng
        toast.success("Login Successful!");
        localStorage.setItem("token", "fake-jwt-token");

        // Điều hướng dựa trên roleId
        if (user.roleId === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        // Nếu không tìm thấy, hiển thị thông báo lỗi
        toast.error("Invalid user ID or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthenTemplate>
      <h1>Login Form</h1>
      <Form
        labelCol={{
          span: 24,
        }}
        confirmLoading={submitting}
        onFinish={handleLogin}
      >
        <Form.Item
          label={<span style={{ color: "white" }}>UserID</span>}
          name="userId"
          rules={[
            {
              required: true,
              message: "You must input your user ID",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "white" }}>Password</span>}
          name="password"
          rules={[
            {
              required: true,
              message: "You must input your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Login
        </Button>
      </Form>
    </AuthenTemplate>
  );
}

export default LoginPage;
