
export const RoomType = {
  DIRECT: 'direct',
  GROUP: 'group',
  PUBLIC: 'public',
  PRIVATE: 'private',
  SYSTEM: 'system',
  SUPPORT: 'support',
} as const;

export type RoomType = (typeof RoomType)[keyof typeof RoomType];
