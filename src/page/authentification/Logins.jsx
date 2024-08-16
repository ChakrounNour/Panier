import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { username, password } = values;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setMessage("success");
      navigate("/dashboard");
    } else {
      setMessage("invalid");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      {message && (
        <Alert
          message={message}
          type={message === "Login successful" ? "success" : "error"}
        />
      )}
      <Form
        onFinish={handleLogin}
        initialValues={{ username: "", password: "" }}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
