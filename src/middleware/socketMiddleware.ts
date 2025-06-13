import { receiveMessage } from '@/features/chat/chatSlice'
import { addOnlineUser, removeOnlineUser, setOnlineUsers } from '@/features/online/onlineSlice'
import socket from '@/services/socket'

export const socketMiddleware = store => next => action => {
  if (action.type === 'chat/sendMessage') {
    socket.emit('chat:message', action.payload)
  }
  return next(action)
}

export const initSocketListeners = (store) => {
  socket.on('chat:message', (msg) => {
    store.dispatch(receiveMessage(msg))
  })

  socket.on('online:list', (users) => {
    store.dispatch(setOnlineUsers(users))
  })

  socket.on('online:join', (user) => {
    store.dispatch(addOnlineUser(user))
  })

  socket.on('online:leave', (userId) => {
    store.dispatch(removeOnlineUser(userId))
  })

  // socket.on('rooms:list', (rooms) => {
  //   store.dispatch(setRooms(rooms))
  // })
}
