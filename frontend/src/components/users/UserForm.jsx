import React from 'react';
import Form from '../common/Form';

const UserForm = ({ 
  user = {}, 
  onSubmit, 
  onCancel, 
  onChange, 
  isEditing = false 
}) => {
  const fields = [
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

  return (
    <Form
      fields={fields}
      values={user}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText={isEditing ? 'Update User' : 'Create User'}
    />
  );
};

export default UserForm;
