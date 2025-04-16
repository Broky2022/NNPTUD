import React from 'react';
import Form from '../common/Form';

const ClassForm = ({ 
  classData = {}, 
  teachers = [],
  onSubmit, 
  onCancel, 
  onChange, 
  isEditing = false 
}) => {
  const fields = [
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

  return (
    <Form
      fields={fields}
      values={classData}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText={isEditing ? 'Update Class' : 'Create Class'}
    />
  );
};

export default ClassForm;
