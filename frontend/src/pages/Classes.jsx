import React, { useState, useEffect } from 'react';
import Table from '../components/common/Table';
import Form from '../components/common/Form';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import ClassService from '../services/class.service';
import UserService from '../services/user.service';
import { useAuth } from '../context/AuthContext';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const { isAdmin, user } = useAuth();
  
  useEffect(() => {
    fetchClasses();
    
    if (isAdmin) {
      fetchTeachers();
    }
  }, [isAdmin]);
  
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await ClassService.getAllClasses();
      setClasses(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch classes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTeachers = async () => {
    try {
      const response = await UserService.getAllUsers();
      // Filter only teachers
      const teachersList = response.data.filter(user => 
        user.role === 'teacher' || user.role === 'admin'
      );
      setTeachers(teachersList);
    } catch (err) {
      console.error('Failed to fetch teachers', err);
    }
  };
  
  const handleEditClass = (classItem) => {
    setFormValues({
      _id: classItem._id,
      name: classItem.name,
      description: classItem.description,
      teacher: classItem.teacher?._id || classItem.teacher,
      schedule: classItem.schedule,
      capacity: classItem.capacity
    });
    setIsEditing(true);
  };
  
  const handleDeleteClass = async (classItem) => {
    if (window.confirm(`Are you sure you want to delete ${classItem.name}?`)) {
      try {
        await ClassService.deleteClass(classItem._id);
        setSuccess(`Class ${classItem.name} deleted successfully`);
        fetchClasses();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete class');
      }
    }
  };
  
  const handleFormChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleFormSubmit = async () => {
    try {
      if (isEditing) {
        await ClassService.updateClass(formValues._id, formValues);
        setSuccess('Class updated successfully');
      } else {
        await ClassService.createClass(formValues);
        setSuccess('Class created successfully');
      }
      setIsEditing(false);
      setFormValues({});
      fetchClasses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save class');
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormValues({});
  };
  
  const handleEnroll = async (classItem) => {
    try {
      await ClassService.enrollStudent(classItem._id, user._id);
      setSuccess(`Enrolled in ${classItem.name} successfully`);
      fetchClasses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in class');
    }
  };
  
  const columns = [
    { key: 'name', label: 'Class Name' },
    { 
      key: 'teacher', 
      label: 'Teacher',
      render: (teacher) => teacher?.name || 'No teacher assigned'
    },
    { key: 'description', label: 'Description' },
    { key: 'schedule', label: 'Schedule' },
    { 
      key: 'students', 
      label: 'Enrollment',
      render: (students, classItem) => `${students?.length || 0} / ${classItem.capacity}`
    }
  ];
  
  const classFormFields = [
    {
      name: 'name',
      label: 'Class Name',
      type: 'text',
      placeholder: 'Enter class name',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter class description'
    },
    {
      name: 'teacher',
      label: 'Teacher',
      type: 'select',
      required: true,
      options: teachers.map(teacher => ({ 
        value: teacher._id, 
        label: teacher.name 
      }))
    },
    {
      name: 'schedule',
      label: 'Schedule',
      type: 'text',
      placeholder: 'E.g., Mondays 3:00-4:30 PM'
    },
    {
      name: 'capacity',
      label: 'Capacity',
      type: 'number',
      placeholder: 'Maximum number of students'
    }
  ];
  
  const canEdit = (classItem) => {
    if (isAdmin) return true;
    if (user.role === 'teacher' && (
      classItem.teacher?._id === user._id || 
      classItem.teacher === user._id
    )) return true;
    return false;
  };
  
  const canEnroll = (classItem) => {
    if (user.role === 'admin' || user.role === 'teacher') return false;
    const isEnrolled = classItem.students?.some(student => 
      student._id === user._id || student === user._id
    );
    const isFull = classItem.students?.length >= classItem.capacity;
    return !isEnrolled && !isFull;
  };
  
  return (
    <div className="classes-page">
      <div className="container p-4">
        <h1 className="title is-2">Classes</h1>
        
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
        
        {(isAdmin || user.role === 'teacher') && (
          <div className="box p-4 mb-4">
            <h2 className="title is-4">{isEditing ? 'Edit Class' : 'Add New Class'}</h2>
            <Form
              fields={classFormFields}
              values={formValues}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelEdit}
              submitText={isEditing ? 'Update Class' : 'Create Class'}
            />
          </div>
        )}
        
        <div className="box p-4">
          <h2 className="title is-4">Available Classes</h2>
          {loading ? (
            <div className="has-text-centered p-4">Loading...</div>
          ) : (
            <Table
              columns={columns}
              data={classes}
              onEdit={(classItem) => canEdit(classItem) && handleEditClass(classItem)}
              onDelete={(classItem) => isAdmin && handleDeleteClass(classItem)}
              extraActions={[
                {
                  label: 'Enroll',
                  condition: canEnroll,
                  action: handleEnroll,
                  buttonClass: 'is-success is-small'
                }
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
