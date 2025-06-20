import {MessagePayload} from "@/features/chat/types/message.type";

export interface RoomMember{
  id: string;
  username: string;
}
export interface RoomPayload {
  id: string;
  name: string;
  type: string;
  members: RoomMember[];
  lastMessage?: MessagePayload;
  updated: string;
}
