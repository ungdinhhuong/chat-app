import {receiveMessage, sendMessage as sendMessageAction, updateMessage} from '@/features/chat/chatSlice'
import socket from '@/services/socket'
import {RootState} from "@/store";
import {EnhancedStore, Middleware} from "@reduxjs/toolkit";
import {MessageStatus, SendMessagePayload} from "@/features/chat/types/message.type";

export const socketMiddleware: Middleware<{}, RootState> = store => next => (action: any) => {
  if (action.type === sendMessageAction.type) {
    const {tempId, roomId, content} = action.payload as SendMessagePayload;
    socket.emit('sendMessage', {content, roomId, tempId});
  }
  return next(action);
};

export const initSocketListeners = (store: EnhancedStore<RootState>) => {
  socket.on('connect', () => {
    console.log('[Socket] Connected to server:', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.error('[Socket] Connection error:', err.message);
  });

  socket.on('newMessage', (msg) => {
    store.dispatch(receiveMessage(msg))
  })

  // socket.on('online:list', (users) => {
  //   store.dispatch(setOnlineUsers(users))
  // })

  // socket.on('online:join', (user) => {
  //   store.dispatch(addOnlineUser(user))
  // })

  // socket.on('online:leave', (userId) => {
  //   store.dispatch(removeOnlineUser(userId))
  // })

  socket.on('sendMessageResponse', (res) => {
    if (res.success && res.messageCreated && res.tempId) {
      store.dispatch(updateMessage({
          roomId: res.messageCreated.room.id,
          tempId: res.tempId,
          newMessage: {...res.messageCreated, status: MessageStatus.SENT}
        })
      );
    } else {
      console.warn('[Socket] Failed:', res?.error || 'Unknown error');
    }
  });

  // socket.on('rooms:list', (rooms) => {
  //   store.dispatch(setRooms(rooms))
  // })
}
