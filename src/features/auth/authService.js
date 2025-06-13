import axios from '@/services/axiosClient'

export const login = async (email, password) => {
  return await axios.post('/auth/login', {email, password})
}

export const register = async (user) => {
  return await axios.post('/auth/register', {...user})
}
