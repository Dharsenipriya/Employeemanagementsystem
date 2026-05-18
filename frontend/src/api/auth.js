import api from './client'

export const signupUser = async (userData) => {
  return api.post('/auth/signup', userData)
}

export const loginUser = async (credentials) => {
  return api.post('/auth/login', credentials)
}
