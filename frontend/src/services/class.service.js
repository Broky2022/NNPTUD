import axios from '../utils/axios';

const ClassService = {
  getAllClasses: async () => {
    return await axios.get('/classes');
  },
  
  getClassById: async (id) => {
    return await axios.get(`/classes/${id}`);
  },
  
  createClass: async (classData) => {
    return await axios.post('/classes', classData);
  },
  
  updateClass: async (id, classData) => {
    return await axios.put(`/classes/${id}`, classData);
  },
  
  deleteClass: async (id) => {
    return await axios.delete(`/classes/${id}`);
  },
  
  enrollStudent: async (classId, userId) => {
    return await axios.post(`/classes/${classId}/enroll`, { userId });
  }
};

export default ClassService;
