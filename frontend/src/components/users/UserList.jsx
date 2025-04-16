import React from 'react';
import Table from '../common/Table';

const UserList = ({ 
  users, 
  onEdit, 
  onDelete, 
  loading 
}) => {
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

  if (loading) {
    return <div className="has-text-centered p-4">Loading users...</div>;
  }

  return (
    <Table
      columns={columns}
      data={users}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default UserList;
