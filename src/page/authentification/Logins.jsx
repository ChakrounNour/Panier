import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { User } from '../../helpers/User';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;

    if (username === User.username && password === User.password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard'); 
      console.log("username",username)
    } else {
      setLoginError('Invalid username or password');
    }
  };


  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
