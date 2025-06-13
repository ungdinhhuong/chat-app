import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ChatRoom from '@/features/chat/pages/ChatRoom'
import {ROUTE} from "@/consts/ROUTE.js";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token)
  return token ? children : <Navigate to={ROUTE.AUTH.LOGIN} />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>}/>
    </Routes>
  )
}

export default AppRoutes
