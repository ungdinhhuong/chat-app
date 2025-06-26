import {User} from "@/features/auth/types/auth.type";
import {MessageType} from "@/consts/message-type";
import {RoomPayload} from "@/features/chat/types/room.type";

export type ChatMessageBubbleProps = {
  msg: MessageRedux;
};

export interface MessagePayload {
  id: string;
  content: string,
  sender: User | null,
  room: RoomPayload,
  type: MessageType,
  isEdited: boolean,
  created: Date,
  updated: Date
}

export type MessageRedux = Omit<MessagePayload, 'created' | 'updated'> & {
  created: string;
  updated: string;
  status: MessageStatus;
};

export interface SendMessagePayload {
  tempId: string;
  roomId: string;
  content: string;
}

export const MessageStatus = {
  SENDING: 'SENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
  RECEIVED: 'RECEIVED',
  READ: 'READ'
}
export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];
