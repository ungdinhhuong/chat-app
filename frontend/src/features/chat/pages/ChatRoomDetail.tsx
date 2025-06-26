import React, {useEffect, useRef, useState} from "react";
import {Badge, Box, Button, Flex, Input, Stack, Text, VStack,} from "@chakra-ui/react";
import {ChatMessageBubble} from "@/features/chat/components/ChatMessageBubble.jsx";
import {useChat} from "@/features/chat/hooks/useChat";
import {Sidebar} from "@/features/chat/components/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE} from "@/consts/ROUTE";
import {setMessages, setSelectedRoomId} from "@/features/chat/chatSlice";
import {messageService} from "@/features/chat/services/message.service";
import {MessageRedux, MessageStatus} from "@/features/chat/types/message.type";
import {groupMessagesByDay} from "@/utils/groupMessages";
import {selectUser} from "@/features/auth/authSelectors";

const ChatRoomDetail = () => {
  const {roomId} = useParams<{ roomId: string }>();
  const user = useSelector(selectUser);

  if (!roomId) {
    const navigate = useNavigate();
    navigate(ROUTE.HOME)
    return;
  }
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [roomId]);

  const [inputValue, setInputValue] = useState('');
  const {messages, send} = useChat(roomId);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = inputValue.trim();
    if (!content || !roomId) return;

    send(content);
    setInputValue('');
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Flex h="100vh">
      <Sidebar/>
      <Flex flex={1} direction="column">
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
            {groupMessagesByDay(messages).map((dayGroup, dayIdx) => (
              <Box key={dayIdx} w="full">
                <Text fontSize="xs" color="gray.500" ml={2} textAlign="center" my={2}>{dayGroup.dateLabel}</Text>

                {dayGroup.groups.map((group, groupIdx) => (
                  <Box key={groupIdx} mb={4}>
                    <VStack align="start" gap={1}>
                      {group.messages.map((msg, index) => (
                        <ChatMessageBubble key={msg.id} msg={msg} created={group.created}
                                           isLastInGroup={index === group.messages.length - 1}
                                           isFirstInGroup={index === 0}/>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </Box>
            ))}
            <div ref={messagesEndRef}/>
          </VStack>

          <form onSubmit={handleSend}>
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
                type="submit"
                bg={'blue.500'}
                rounded="md"
                color={'white'}
                flex={'1 0 100px'}
                _hover={{bg: 'blue.600'}}
                _focus={{bg: 'blue.600'}}
              >
                Gửi
              </Button>
            </Stack>
          </form>
        </>
      </Flex>
    </Flex>
  )
};

export default ChatRoomDetail;
