import {receiveMessage, sendMessage as sendMessageAction, updateMessage} from '@/features/chat/chatSlice'
import socket from '@/services/socket'
import {RootState} from "@/store";
import {EnhancedStore, Middleware} from "@reduxjs/toolkit";
import {MessagePayload, MessageStatus, SendMessagePayload} from "@/features/chat/types/message.type";
import {SOCKET_EVENT} from "@/consts/socket-events";

export const socketMiddleware: Middleware<{}, RootState> = store => next => (action: any) => {
  if (action.type === sendMessageAction.type) {
    const {tempId, roomId, content} = action.payload as SendMessagePayload;
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {content, roomId, tempId});
  }
  return next(action);
};
let initialized = false;
export const initSocketListeners = (store: EnhancedStore<RootState>) => {
  if (initialized) return;
  initialized = true;

  socket.on('connect', () => {
    console.log('[Socket] Connected to server:', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.error('[Socket] Connection error:', err.message);
  });

  socket.on(SOCKET_EVENT.NEW_MESSAGE, (msg: MessagePayload) => {
    const state = store.getState();
    const currentUserId = state.auth.user?.id;

    // Nếu là tin của chính mình → bỏ qua
    if (msg.sender && msg.sender.id === currentUserId) return;

    console.log('[Socket] New message received:', msg);
    store.dispatch(receiveMessage({
      roomId: msg.room.id,
      message: {
        ...msg,
        created: new Date(msg.created).toISOString(),
        updated: new Date(msg.updated).toISOString(),
        status: MessageStatus.RECEIVED
      }
    }))
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

  socket.on(SOCKET_EVENT.SEND_MESSAGE_RESPONSE, (res) => {
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
