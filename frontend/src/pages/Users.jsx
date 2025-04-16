import React, { useState, useEffect } from 'react';
import Table from '../components/common/Table';
import Form from '../components/common/Form';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import UserService from '../services/user.service';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditUser = (user) => {
    setFormValues({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsEditing(true);
  };
  
  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await UserService.deleteUser(user._id);
        setSuccess(`User ${user.name} deleted successfully`);
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
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
        await UserService.updateUser(formValues._id, formValues);
        setSuccess('User updated successfully');
      } else {
        await UserService.createUser(formValues);
        setSuccess('User created successfully');
      }
      setIsEditing(false);
      setFormValues({});
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save user');
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormValues({});
  };
  
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { 
      key: 'createdAt', 
      label: 'Created At',
      render: (value) => new Date(value).toLocaleDateString() 
    }
  ];
  
  const userFormFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter user name',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter user email',
      required: true
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'user', label: 'User' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'admin', label: 'Admin' }
      ]
    },
    ... !isEditing ? [
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        required: !isEditing
      }
    ] : []
  ];
  
  if (!isAdmin) {
    return <div className="container mt-4">
      <Alert type="error" message="You don't have permission to access this page." />
    </div>;
  }
  
  return (
    <div className="users-page">
      <div className="container p-4">
        <h1 className="title is-2">User Management</h1>
        
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
        
        <div className="box p-4 mb-4">
          <h2 className="title is-4">{isEditing ? 'Edit User' : 'Add New User'}</h2>
          <Form
            fields={userFormFields}
            values={formValues}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
            submitText={isEditing ? 'Update User' : 'Create User'}
          />
        </div>
        
        <div className="box p-4">
          <h2 className="title is-4">User List</h2>
          {loading ? (
            <div className="has-text-centered p-4">Loading...</div>
          ) : (
            <Table
              columns={columns}
              data={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
