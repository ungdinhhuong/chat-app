import React, {useState} from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {FaCogs, FaLaptop, FaPlus, FaUserNurse, FaUserTie} from 'react-icons/fa';
import {ChatMessageBubble} from "@/features/chat/components/ChatMessageBubble.jsx";
import {ChatRoomItem} from "@/features/chat/components/ChatRoomItem.jsx";

const ChatRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      id: 1,
      name: "Nhóm Công Việc",
      lastMessage: "Chào mọi người!",
      time: "5 phút trước",
      unread: 2,
    },
    {
      id: 2,
      name: "Bạn Bè",
      lastMessage: "Hẹn gặp lại nhé!",
      time: "30 phút trước",
      unread: 0,
    },
  ];

  const messages = [
    {sender: "alice", text: "Chào mọi người!", time: "12:10"},
    {sender: "bob", text: "Hi các bạn! Hôm nay làm việc thế nào?", time: "12:15"},
    {sender: "admin", text: "Xin chào Alice!", time: "12:17"},
  ];

  const users = [
    {name: "admin", icon: FaUserTie},
    {name: "alice", icon: FaLaptop},
    {name: "bob", icon: FaUserNurse},
  ];

  return (
    <Flex h="100vh">
      <Box w="300px" borderRight="1px solid #e2e8f0">
        <Flex direction="column" justify="space-between" h="100%">
          <Box bg={"#fff"}>
            <Flex align="center" p={4} mb={4} borderBottom="1px solid #e2e8f0">
              <Avatar.Root>
                <Avatar.Fallback name="admin"/>
                <Avatar.Image src="https://bit.ly/sage-adebayo"/>
              </Avatar.Root>
              <Text fontWeight="bold">admin</Text>
              <Spacer/>
              <IconButton size="sm" aria-label="Settings">
                <FaCogs/>
              </IconButton>
            </Flex>

            <Flex align="center" justify="space-between" p={4} mb={2}>
              <Text fontSize="sm" fontWeight="semibold">Phòng Chat</Text>
              <IconButton size="xs" aria-label="Thêm phòng" variant="outline">
                <FaPlus/>
              </IconButton>
            </Flex>

            <VStack spacing={2} align="stretch" p={4}>
              {rooms.map((room) => (
                <ChatRoomItem
                  key={room.id}
                  title="Nhóm Công Việc"
                  message="Chào mọi người!"
                  time="4 giờ trước"
                  unreadCount={2}
                  isActive={false}
                  onClick={() => setSelectedRoom(room.id)}
                />
              ))}
            </VStack>
          </Box>
          <Box borderTop={"1px solid #e2e8f0"} p={4} mt={4}>
            <Text fontWeight="bold" mb={2}>
              Đang online ({users.length})
            </Text>
            {users.map((user) => {
              const Icon = user.icon;
              return (
                <HStack key={user.name} spacing={2} mb={2} position="relative">
                  <Box position="relative">
                    <Icon fontSize="20px"/>
                    <Box
                      position="absolute"
                      bottom={"-0.25rem"}
                      right={"-0.25rem"}
                      w="0.75rem"
                      h="0.75rem"
                      bg="green.400"
                      borderRadius="full"
                      border="2px solid white"
                    />
                  </Box>
                  <Text>{user.name}</Text>
                </HStack>
              );
            })}
          </Box>
        </Flex>
      </Box>

      <Flex flex={1} direction="column">
        {selectedRoom ? (
          <>
            <Flex justify="space-between" align="center" p={4} bg="gray.50" borderBottom="1px solid #e2e8f0"
                  minH={"4.55rem"}>
              <Flex gap={2}>
                <Text fontWeight="bold">Nhóm Công Việc</Text>
                <Badge colorPalette="green">3 thành viên</Badge>
              </Flex>
              <Box>
              </Box>
            </Flex>

            <VStack flex={1} align="start" spacing={3} overflowY="auto" bg="gray.100" p={4}>
              {messages.map((msg, i) => (
                <>
                  <ChatMessageBubble
                    message="Hẹn gặp lại nhé!"
                    time="11:50"
                    sender="alice"
                  />

                  <ChatMessageBubble
                    message="OK, tạm biệt!"
                    time="11:55"
                    isOwnMessage
                    seen
                  />
                </>
              ))}
            </VStack>

            <Stack spacing={4} p={4} borderTop="1px solid #e2e8f0" direction={{base: 'column', md: 'row'}} w={'full'}>
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
              />
              <Button
                bg={'teal.500'}
                rounded="md"
                color={'white'}
                flex={'1 0 100px'}
                _hover={{bg: 'teal.600'}}
                _focus={{bg: 'teal.600'}}>
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
