export const SOCKET_EVENT = {
  CHAT_MESSAGES: 'chat_messages',

  ONLINE_USERS: 'online_users',

  JOIN_ROOM: 'join_room',
  JOINED_ROOM: 'joined_room',
  LEAVE_ROOM: 'leave_room',
  SEND_MESSAGE: 'send_message',
  USER_TYPING: 'user_typing',
  SEND_MESSAGE_RESPONSE: 'send_message_response',
  LEFT_ROOM: 'left_room',
  NEW_MESSAGE: 'new_message',
}

export type SocketEvent = typeof SOCKET_EVENT[keyof typeof SOCKET_EVENT];
