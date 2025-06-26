import {useDispatch, useSelector} from "react-redux";
import {selectMessagesByRoom} from "@/features/chat/chatSelectors";
import {v4 as uuidv4} from 'uuid';
import {MessageRedux, MessageStatus} from "@/features/chat/types/message.type";
import {addTempMessage, sendMessage} from "@/features/chat/chatSlice";
import {selectUser} from "@/features/auth/authSelectors";
import {User} from "@/features/auth/types/auth.type";
import {MessageType} from "@/consts/message-type";
import {RoomPayload} from "@/features/chat/types/room.type";

export function useChat(roomId: string) {
  const user = useSelector(selectUser) as User;

  const rawMessages = useSelector(
    roomId ? selectMessagesByRoom(roomId) : () => []
  );

  const messages = rawMessages.map(m => ({
    ...m,
    created: m.created,
    updated: m.updated,
  }));

  const dispatch = useDispatch();

  const send = (content: string) => {
    if (!roomId) return;

    const tempId = uuidv4();
    const tempMessage: MessageRedux = {
      id: tempId,
      content,
      sender: user,
      room: { id: roomId, name: '' } as RoomPayload,
      type: MessageType.TEXT,
      isEdited: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      status: MessageStatus.SENDING
    };

    dispatch(addTempMessage({ roomId, message: tempMessage }));
    dispatch(sendMessage({ tempId, roomId, content }));
  };

  return { messages, send };
}
