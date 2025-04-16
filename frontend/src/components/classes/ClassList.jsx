import React from 'react';
import Table from '../common/Table';

const ClassList = ({ 
  classes, 
  onEdit, 
  onDelete, 
  onEnroll,
  currentUser,
  loading 
}) => {
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

  const canEdit = (classItem) => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'teacher' && (
      classItem.teacher?._id === currentUser._id || 
      classItem.teacher === currentUser._id
    )) return true;
    return false;
  };
  
  const canEnroll = (classItem) => {
    if (!currentUser || currentUser.role === 'admin' || currentUser.role === 'teacher') return false;
    const isEnrolled = classItem.students?.some(student => 
      student._id === currentUser._id || student === currentUser._id
    );
    const isFull = classItem.students?.length >= classItem.capacity;
    return !isEnrolled && !isFull;
  };

  if (loading) {
    return <div className="has-text-centered p-4">Loading classes...</div>;
  }

  const extraActions = [];
  
  if (onEnroll) {
    extraActions.push({
      label: 'Enroll',
      condition: canEnroll,
      action: onEnroll,
      buttonClass: 'is-success is-small'
    });
  }

  return (
    <Table
      columns={columns}
      data={classes}
      onEdit={(classItem) => canEdit(classItem) && onEdit(classItem)}
      onDelete={(classItem) => currentUser?.role === 'admin' && onDelete(classItem)}
      extraActions={extraActions.length > 0 ? extraActions : undefined}
    />
  );
};

export default ClassList;
