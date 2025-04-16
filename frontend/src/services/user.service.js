import axios from '../utils/axios';

const UserService = {
  getAllUsers: async () => {
    return await axios.get('/users');
  },
  
  getUserById: async (id) => {
    return await axios.get(`/users/${id}`);
  },
  
  createUser: async (userData) => {
    return await axios.post('/users', userData);
  },
  
  updateUser: async (id, userData) => {
    return await axios.put(`/users/${id}`, userData);
  },
  
  deleteUser: async (id) => {
    return await axios.delete(`/users/${id}`);
  }
};

export default UserService;
