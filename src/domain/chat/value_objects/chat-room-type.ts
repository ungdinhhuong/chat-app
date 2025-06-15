
export const ChatRoomType = {
  DIRECT: 'direct',
  GROUP: 'group',
  PUBLIC: 'public',
  PRIVATE: 'private',
  SYSTEM: 'system',
  SUPPORT: 'support',
} as const;

export type ChatRoomType = (typeof ChatRoomType)[keyof typeof ChatRoomType];
