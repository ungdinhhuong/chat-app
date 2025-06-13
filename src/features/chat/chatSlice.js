import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: []
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveMessage(state, action) {
      state.messages.push(action.payload)
    },
    sendMessage: (state, action) => {
      // gửi socket ở middleware, reducer này chỉ là trigger
    },
    setMessages(state, action) {
      state.messages = action.payload
    }
  }
})

export const { receiveMessage, sendMessage, setMessages } = chatSlice.actions
export default chatSlice.reducer
