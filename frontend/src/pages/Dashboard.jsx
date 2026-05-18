import React, { useState, useEffect } from 'react'
import { getEmployees, deleteEmployee, searchEmployees } from '../api/employees'
import { getDepartments } from '../api/departments'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeList from '../components/EmployeeList'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = ({ user }) => {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [empData, deptData] = await Promise.all([
        getEmployees(),
        getDepartments()
      ])
      setEmployees(empData)
      setDepartments(deptData)
      setError('')
    } catch (err) {
      setError('Failed to load data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      fetchData()
    } else {
      try {
        const results = await searchEmployees(term)
        setEmployees(results)
      } catch (err) {
        console.error('Search error:', err)
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id)
        setEmployees(employees.filter(emp => emp.id !== id))
      } catch (err) {
        setError('Failed to delete employee')
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEmployee(null)
  }

  const handleFormSuccess = () => {
    fetchData()
    handleFormClose()
  }

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  // Calculate department distribution
  const deptCounts = {}
  employees.forEach(emp => {
    const deptName = emp.department?.name || 'Unknown'
    deptCounts[deptName] = (deptCounts[deptName] || 0) + 1
  })

  const chartData = {
    labels: Object.keys(deptCounts),
    datasets: [{
      label: 'Employees by Department',
      data: Object.values(deptCounts),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ],
      borderColor: '#fff',
      borderWidth: 2
    }]
  }

  return (
    <div className="container">
      {error && <div className="alert alert-error">{error}</div>}

      <div className="dashboard-header">
        <h2>📊 Dashboard</h2>
        <div className="search-add-bar">
          <input
            type="text"
            placeholder="🔍 Search employees..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="primary" onClick={() => setShowForm(true)}>
            ➕ Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <div className="value">{employees.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Departments</h3>
          <div className="value">{departments.length}</div>
        </div>
        <div className="stat-card">
          <h3>Average Salary</h3>
          <div className="value">
            ${employees.length > 0
              ? (employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.length).toFixed(0)
              : 0
            }
          </div>
        </div>
      </div>

      {/* Chart */}
      {employees.length > 0 && deptCounts && Object.keys(deptCounts).length > 0 && (
        <div className="chart-container">
          <h3>📈 Employee Distribution by Department</h3>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Pie data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      )}

      {/* Employee Form Modal */}
      {showForm && (
        <div className="modal open">
          <div className="modal-content">
            <EmployeeForm
              employee={editingEmployee}
              departments={departments}
              onSuccess={handleFormSuccess}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}

      {/* Employee List */}
      {loading ? (
        <div className="loading">Loading employees...</div>
      ) : employees.length === 0 ? (
        <div className="empty-state">
          <h3>No employees found</h3>
          <p>Click "Add Employee" to get started</p>
        </div>
      ) : (
        <EmployeeList
          employees={employees}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  )
}

export default Dashboard
