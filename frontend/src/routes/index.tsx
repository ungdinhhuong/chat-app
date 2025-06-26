import {Navigate, Route, Routes} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ChatRoom from '@/features/chat/pages/ChatRoom'
import {ROUTE} from "@/consts/ROUTE.js";
import React from "react";
import ChatRoomDetail from "@/features/chat/pages/ChatRoomDetail";

type ProtectedRouteProps = {
  children: React.ReactNode
}
const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const token = useSelector((state: any) => state.auth.token)
  return token ? children : <Navigate to={ROUTE.AUTH.LOGIN}/>
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/" element={<ProtectedRoute><ChatRoom/></ProtectedRoute>}/>
      <Route
        path="/chat/:roomId"
        element={
          <ProtectedRoute>
            <ChatRoomDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
