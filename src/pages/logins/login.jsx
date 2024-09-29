import { Button, Form, Input } from "antd";
import AuthenTemplate from "../../components/authentification/authen";

function LoginPage() {
  return (
    <AuthenTemplate>
      <h1>Login Form</h1>
      <Form
        labelCol={{
          span: 24,
        }}
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
        <Button type="primary">Login</Button>
      </Form>
    </AuthenTemplate>
  );
}

export default LoginPage;
