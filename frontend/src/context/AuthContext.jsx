import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/axiosConfig';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) { setLoading(false); return; }
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch {
        localStorage.removeItem('token');
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      const userRes = await api.get('/auth/me');
      setUser(userRes.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.msg || 'Registration failed' };
    }
  };

  const login = async (formData) => {
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      const userRes = await api.get('/auth/me');
      setUser(userRes.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.msg || 'Invalid credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};