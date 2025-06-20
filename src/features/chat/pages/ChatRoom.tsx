import React, {useEffect, useRef, useState} from "react";
import {Badge, Box, Button, Flex, Input, Stack, Text, VStack,} from "@chakra-ui/react";
import {ChatMessageBubble} from "@/features/chat/components/ChatMessageBubble.jsx";
import socket from "@/services/socket";
import {useChat} from "@/features/chat/hooks/useChat";
import {Sidebar} from "@/features/chat/components/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedRoomId} from "@/features/chat/chatSelectors";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector(selectSelectedRoomId);

  const [inputValue, setInputValue] = useState('');
  const {messages, send} = useChat(selectedRoom);

  const handleSend = () => {
    const content = inputValue.trim();
    if (!content || !selectedRoom) return;

    send(content);
    setInputValue('');
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  return (
    <Flex h="100vh">
      <Sidebar/>
      <Flex flex={1} direction="column">
        {selectedRoom ? (
          <>
            <Flex justify="space-between" align="center" p={4} bg="gray.50" borderBottomWidth="1px"
                  borderColor={"gray.200"}
                  minH={"4.55rem"}>
              <Flex gap={2}>
                <Text fontWeight="bold">Nhóm Công Việc</Text>
                <Badge colorPalette="green">3 thành viên</Badge>
              </Flex>
              <Box>
              </Box>
            </Flex>

            <VStack flex={1} align="start" gap={3} overflowY="auto" bg="gray.100" p={4}>
              {messages.map((msg) => (
                <ChatMessageBubble
                  key={msg.id}
                  message={msg.content}
                  time={msg.updated}
                  sender={msg.sender?.username || "..."}
                />
              ))}
              <div ref={messagesEndRef}/>
            </VStack>

            <Stack gap={4} p={4} borderTopWidth="1px" borderColor={"gray.200"}
                   direction={{base: 'column', md: 'row'}} w={'full'}>
              <Input
                type={'text'}
                placeholder={'Nhập nội dung tin nhắn...'}
                color={'gray.800'}
                rounded="md"
                border="1px solid #e2e8f0"
                _focus={{
                  bg: 'gray.200',
                  outline: 'none',
                }}
                bg="white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                bg={'blue.500'}
                rounded="md"
                color={'white'}
                flex={'1 0 100px'}
                _hover={{bg: 'blue.600'}}
                _focus={{bg: 'blue.600'}}
                onClick={handleSend}
              >
                Gửi
              </Button>
            </Stack>
          </>
        ) : (
          <Flex flex={1} align="center" justify="center">
            <Text color="gray.500">Chọn một phòng chat để bắt đầu</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
};

export default ChatRoom;
