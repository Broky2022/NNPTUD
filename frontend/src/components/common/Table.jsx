import React from 'react';

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={`${item._id}-${column.key}`}>
                  {typeof column.render === 'function' 
                    ? column.render(item[column.key], item) 
                    : item[column.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  {onEdit && (
                    <button
                      className="button is-small is-info mr-2"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="button is-small is-danger"
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
