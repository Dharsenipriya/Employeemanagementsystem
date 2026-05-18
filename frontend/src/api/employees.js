import api from './client'

export const getEmployees = async () => {
  return api.get('/employees')
}

export const createEmployee = async (employeeData) => {
  return api.post('/employees', employeeData)
}

export const updateEmployee = async (id, employeeData) => {
  return api.put(`/employees/${id}`, employeeData)
}

export const deleteEmployee = async (id) => {
  return api.delete(`/employees/${id}`)
}

export const searchEmployees = async (searchTerm) => {
  return api.get(`/employees/search?name=${encodeURIComponent(searchTerm)}`)
}
