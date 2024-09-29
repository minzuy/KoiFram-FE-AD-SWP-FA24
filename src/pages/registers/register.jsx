// import React from 'react'
import "./register.css";
import { Button, Form, Input } from "antd";
import AuthenTemplate from "../../components/authentification/authen";
import { toast } from "react-toastify";
import api from "../../config/axios";

function RegisterPage() {
  const [form] = Form.useForm();

  const validatePassword = (_, value) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords do not match!"));
  };
  const handleRegister = async (values) => {
    console.log(values); // Logging form values
    try {
      // submit data to BE <=> POST
      // value.role = "ADMIN"
      const response = await api.post("register", values);
      toast.success("Registration successful!");
      // chuyển hướng sang trang login
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed!");
    }
  };
  return (
    <AuthenTemplate>
      <h1>Register form</h1>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={handleRegister} // Using only one onFinish handler
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
        <Form.Item
          label={<span style={{ color: "white" }}>Re-enter Password</span>}
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "You must confirm your password",
            },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* Hidden RoleID input */}
        <Form.Item
          name="RoleID"
          initialValue="AD" // Giá trị mặc định là AD
          hidden // Ẩn input này
        >
          <Input />
        </Form.Item>
        <div className="show-role">
          <p>ROLE ID : AD</p>
        </div>
        <br></br>
        <br></br>

        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </AuthenTemplate>
  );
}

export default RegisterPage;
