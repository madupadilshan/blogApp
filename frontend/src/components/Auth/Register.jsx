import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      await register(values);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return <AuthForm isLogin={false} onSubmit={handleRegister} />;
};

export default Register;