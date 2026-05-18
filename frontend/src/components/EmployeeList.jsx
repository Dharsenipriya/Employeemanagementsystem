import React from 'react'

const EmployeeList = ({ employees, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatSalary = (salary) => {
    return `$${salary?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || '0'}`
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Joining Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.department?.name}</td>
            <td>{formatSalary(employee.salary)}</td>
            <td>{formatDate(employee.joiningDate)}</td>
            <td>
              <div className="actions">
                <button
                  className="primary"
                  onClick={() => onEdit(employee)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  className="danger"
                  onClick={() => onDelete(employee.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default EmployeeList
