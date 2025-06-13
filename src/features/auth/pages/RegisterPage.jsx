import AuthForm from '../components/AuthForm'
import { useAuth } from '../hooks/useAuth'

const RegisterPage = () => {
  const { handleRegister } = useAuth()

  return <AuthForm type="register" onSubmit={handleRegister} />
}

export default RegisterPage
