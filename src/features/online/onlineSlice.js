import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  onlineUsers: []
}

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload
    },
    addOnlineUser(state, action) {
      state.onlineUsers.push(action.payload)
    },
    removeOnlineUser(state, action) {
      state.onlineUsers = state.onlineUsers.filter(user => user.id !== action.payload)
    }
  }
})

export const { setOnlineUsers, addOnlineUser, removeOnlineUser } = onlineSlice.actions
export default onlineSlice.reducer
