import React, { useState } from 'react'
import { createEmployee, updateEmployee } from '../api/employees'

const EmployeeForm = ({ employee, departments, onSuccess, onClose }) => {
  const [formData, setFormData] = useState(
    employee || {
      name: '',
      email: '',
      salary: '',
      joiningDate: new Date().toISOString().split('T')[0],
      departmentId: departments[0]?.id || ''
    }
  )
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = {
        ...formData,
        salary: parseFloat(formData.salary) || 0,
        departmentId: parseInt(formData.departmentId)
      }

      if (employee?.id) {
        await updateEmployee(employee.id, data)
      } else {
        await createEmployee(data)
      }

      onSuccess()
    } catch (err) {
      setError(err.message || 'Failed to save employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{employee ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </div>

      <div className="form-group">
        <label>Department *</label>
        <select
          name="departmentId"
          value={formData.departmentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Salary</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter salary"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>Joining Date *</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal-buttons">
        <button type="button" className="secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm
