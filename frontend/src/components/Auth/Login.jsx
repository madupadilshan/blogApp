import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await login(values);
      navigate('/'); // Changed from '/' to '/'
    } catch (error) {
      console.error('Login failed:', error);
      // You might want to show an error message to the user here
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return <AuthForm isLogin onSubmit={handleLogin} />;
};

export default Login;