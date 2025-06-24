import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {MessageRedux} from "@/features/chat/types/message.type";

interface ChatState {
  messages: {
    [roomId: string]: MessageRedux[];
  };
  selectedRoomId: string | null,
  typingUsers: [],
}

const initialState: ChatState = {
  messages: {},
  selectedRoomId: null as string | null,
  typingUsers: [],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<{ roomId: string; messages: MessageRedux[] }>) {
      state.messages[action.payload.roomId] = action.payload.messages;
    },
    sendMessage: (state, action: PayloadAction<{ tempId: string; roomId: string; content: string }>) => {
      // gửi socket ở middleware, reducer này chỉ là trigger
    },
    addTempMessage(state, action: PayloadAction<{ roomId: string; message: MessageRedux }>) {
      const {roomId, message} = action.payload;
      state.messages[roomId] ||= [];
      state.messages[roomId].push(message);
    },
    receiveMessage(state, action: PayloadAction<{ roomId: string; message: MessageRedux }>) {
      const {roomId, message} = action.payload;
      state.messages[roomId] ||= [];
      state.messages[roomId].push(message);
    },
    updateMessage(state, action: PayloadAction<{ roomId: string; tempId: string; newMessage: MessageRedux }>) {
      const {roomId, tempId, newMessage} = action.payload;
      const mgs = state.messages[roomId] || [];
      const index = mgs.findIndex(m => m.id === tempId);
      if (index !== -1) mgs[index] = newMessage;
    },
    setSelectedRoomId: (state, action: PayloadAction<string>) => {
      state.selectedRoomId = action.payload;
    },
  }
})

export const {
  setMessages,
  sendMessage,
  addTempMessage,
  receiveMessage,
  updateMessage,
  setSelectedRoomId
} = chatSlice.actions

export default chatSlice.reducer
