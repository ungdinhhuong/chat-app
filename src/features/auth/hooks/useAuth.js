import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../authSlice'
import * as authService from '../authService'

export const useAuth = () => {
  const dispatch = useDispatch()

  const handleLogin = async (email, password) => {
    const data = await authService.login(email, password)
    dispatch(loginSuccess(data))
  }

  const handleRegister = async (email, password) => {
    const data = await authService.register(email, password)
    dispatch(loginSuccess(data))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return { handleLogin, handleRegister, handleLogout }
}
