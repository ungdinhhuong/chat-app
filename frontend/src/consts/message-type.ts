export const MessageType = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
  STICKER: 'sticker',
  REACTION: 'reaction',
  SYSTEM: 'system',
  CALL: 'call',
  LOCATION: 'location',
  POLL: 'poll',
  REPLY: 'reply',
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];
