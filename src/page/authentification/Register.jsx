import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleRegister = (values) => {
    const { username, password } = values;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setMessage("utilisateur existe deja");
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    navigate("/dashboard");
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("utilisateur enregistre");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Register</h2>
      {message && (
        <Alert
          message={message}
          type={message === "utilisateur enregistre" ? "success" : "error"}
        />
      )}
      <Form
        onFinish={handleRegister}
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
