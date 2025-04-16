import axios from '../utils/axios';

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  register: async (userData) => {
    return await axios.post('/auth/register', userData);
  },
  
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'admin';
  }
};

export default AuthService;
