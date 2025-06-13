import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rooms: [],
  currentRoom: null
}

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms(state, action) {
      state.rooms = action.payload
    },
    setCurrentRoom(state, action) {
      state.currentRoom = action.payload
    }
  }
})

export const { setRooms, setCurrentRoom } = roomsSlice.actions
export default roomsSlice.reducer
