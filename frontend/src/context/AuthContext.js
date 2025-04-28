import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      return { success: true };
    } catch (err) {
      throw err;
    }
  };

  const login = async (formData) => {
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      return { success: true };
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['Authorization'];
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        register,
        login,
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);