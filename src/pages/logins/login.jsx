import { Button, Form, Input } from "antd";
import AuthenTemplate from "../../components/authentification/authen";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [submitting, setSubtmitting] = useState(false);
  const handleLogin = async (values) => {
    try {
      const respone = await api.post("login", values);
      toast.success("Login Successfull !");
      // const { role, token } = respone.data;
      // localStorage.setItem("token", token)
      // => định danh user for BE
      // if( role === "ADMIN" ){
      //   navigate("/admin")
      // }
    } catch (error) {
      toast.error(error.respone.data);
      console.log(error);
    } finally {
      setSubtmitting(false);
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
          label={<span style={{ color: "white" }}>UserName</span>}
          name="username"
          rules={[
            {
              required: true,
              message: "You must input your username",
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
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </AuthenTemplate>
  );
}

export default LoginPage;
