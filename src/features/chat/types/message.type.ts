import {User} from "@/features/auth/types/auth.type";
import {MessageType} from "@/consts/message-type";

export interface MessagePayload {
  id: string;
  content: string,
  sender: User | null,
  type: MessageType,
  isEdited: boolean,
  created: Date,
  updated: Date
}

export type MessageRedux = Omit<MessagePayload, 'created' | 'updated'> & {
  created: string;
  updated: string;
};

export interface SendMessagePayload {
  tempId: string;
  roomId: string;
  content: string;
}
