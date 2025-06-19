export const UserStatus = {
  ONLINE: 'offline',
  OFFLINE: 'online',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
