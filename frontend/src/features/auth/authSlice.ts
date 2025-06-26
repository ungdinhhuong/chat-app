import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoginPayload, AuthState} from "@/features/auth/types/auth.type";

const initialState: AuthState = {
  user: null,
  token: null,
  isLogged: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLogged = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLogged = false
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
