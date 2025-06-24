import {Flex, IconButton, Text, VStack} from "@chakra-ui/react";
import {FaPlus} from "react-icons/fa";
import {ChatRoomItem} from "@/features/chat/components/ChatRoomItem";
import {formatTimeVN} from "@/utils/date.utils";
import React, {useEffect, useState} from "react";
import {RoomPayload} from "@/features/chat/types/room.type";
import {roomService} from "@/features/chat/services/room.service";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "@/features/auth/authSelectors";
import {User} from "@/features/auth/types/auth.type";
import {setMessages, setSelectedRoomId} from "@/features/chat/chatSlice";
import {RootState} from "@/store";
import {messageService} from "@/features/chat/services/message.service";
import {MessageRedux, MessageStatus} from "@/features/chat/types/message.type";
import socket from "@/services/socket";


export const RoomList = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser) as User;
  const selectedRoom = useSelector((state: RootState) => state.chat.selectedRoomId);

  const [rooms, setRooms] = useState<RoomPayload[]>([]);

  useEffect(() => {
    (async () => {
      const response = await roomService.getRooms(user.id);
      setRooms(response.data.items);
    })();
  }, []);

  useEffect(() => {
    if (!selectedRoom) return;

    socket.emit("joinRoom", {roomId: selectedRoom});
    socket.on("joinedRoom", ({roomId}) => {
      console.log(`[Socket] Đã vào phòng ${roomId}`);
    });

    return () => {
      socket.emit("leaveRoom", {roomId: selectedRoom});
      console.log(`[Socket] Đã ra khỏi phòng ${selectedRoom}`);
    };
  }, [selectedRoom]);

  const handleRoomClick = (roomId: string) => {
    dispatch(setSelectedRoomId(roomId));
    (async () => {
      const response = await messageService.getMessages(roomId);
      dispatch(setMessages({
        roomId,
        messages: response.data.items.map((msg): MessageRedux => ({
          ...msg,
          created: new Date(msg.created).toISOString(),
          updated: new Date(msg.updated).toISOString(),
          status: MessageStatus.RECEIVED
        })),
      }));
    })();
  };

  return (
    <>
      <Flex align="center" justify="space-between" p={4}>
        <Text fontSize="sm" fontWeight="semibold">Phòng Chat</Text>
        <IconButton size="xs" aria-label="Thêm phòng" variant="outline">
          <FaPlus/>
        </IconButton>
      </Flex>

      <VStack gap={2} align="stretch" p={4}>
        {rooms.map((room) => (
          <ChatRoomItem
            key={room.id}
            title={room.name}
            message={room.lastMessage?.content || ""}
            time={formatTimeVN(room.updated)}
            unreadCount={2}
            isActive={room.id === selectedRoom}
            onClick={() => handleRoomClick(room.id)}
          />
        ))}
      </VStack>
    </>
  )
}
