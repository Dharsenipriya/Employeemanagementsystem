import api from './client'

export const getDepartments = async () => {
  return api.get('/departments')
}

export const createDepartment = async (departmentData) => {
  return api.post('/departments', departmentData)
}

export const updateDepartment = async (id, departmentData) => {
  return api.put(`/departments/${id}`, departmentData)
}

export const deleteDepartment = async (id) => {
  return api.delete(`/departments/${id}`)
}
