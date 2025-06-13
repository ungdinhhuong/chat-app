import React, { useState, useRef, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Avatar,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  Badge,
  InputGroup,
  InputRightElement,
  Divider,
  ScrollArea,
  Container,
  useToast
} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
  ChatIcon,
  AttachmentIcon,
  PhoneIcon,
  InfoIcon
} from '@chakra-ui/icons';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Chào mừng bạn đến với ứng dụng chat của chúng tôi 👋",
      sender: "AI Assistant",
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
      isOwn: false,
      avatar: "https://bit.ly/sage-adebayo"
    },
    {
      id: 2,
      text: "Tôi có thể giúp gì cho bạn hôm nay?",
      sender: "AI Assistant",
      timestamp: new Date(Date.now() - 240000).toLocaleTimeString(),
      isOwn: false,
      avatar: "https://bit.ly/sage-adebayo"
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const chatBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('blue.500', 'blue.600');
  const inputBg = useColorModeValue('white', 'gray.700');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "Bạn",
      timestamp: new Date().toLocaleTimeString(),
      isOwn: true,
      avatar: "https://bit.ly/dan-abramov"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Mô phỏng phản hồi từ AI
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Cảm ơn bạn đã nhắn tin! Tôi đã nhận được tin nhắn của bạn.",
        "Thật thú vị! Bạn có thể kể thêm về điều này không?",
        "Tôi hiểu rồi. Còn gì khác tôi có thể giúp bạn không?",
        "Đó là một câu hỏi hay! Hãy để tôi suy nghĩ một chút...",
        "Cảm ơn bạn đã chia sẻ! Tôi rất vui được trò chuyện với bạn."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "AI Assistant",
        timestamp: new Date().toLocaleTimeString(),
        isOwn: false,
        avatar: "https://bit.ly/sage-adebayo"
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble = ({ message }) => (
    <Flex
      justify={message.isOwn ? "flex-end" : "flex-start"}
      mb={4}
      align="flex-end"
    >
      {!message.isOwn && (
        <Avatar size="sm" src={message.avatar} mr={2} />
      )}

      <Box
        maxW="70%"
        bg={message.isOwn ? "blue.500" : useColorModeValue("gray.100", "gray.700")}
        color={message.isOwn ? "white" : useColorModeValue("gray.800", "white")}
        px={4}
        py={2}
        borderRadius="lg"
        borderBottomRightRadius={message.isOwn ? "sm" : "lg"}
        borderBottomLeftRadius={message.isOwn ? "lg" : "sm"}
        boxShadow="sm"
      >
        <Text fontSize="sm" fontWeight="medium" mb={1}>
          {message.sender}
        </Text>
        <Text>{message.text}</Text>
        <Text
          fontSize="xs"
          color={message.isOwn ? "blue.100" : useColorModeValue("gray.500", "gray.400")}
          mt={1}
        >
          {message.timestamp}
        </Text>
      </Box>

      {message.isOwn && (
        <Avatar size="sm" src={message.avatar} ml={2} />
      )}
    </Flex>
  );

  return (
    <ChakraProvider>
      <Box bg={bgColor} minH="100vh">
        <Container maxW="4xl" p={0}>
          <VStack h="100vh" spacing={0}>
            {/* Header */}
            <Flex
              w="100%"
              bg={headerBg}
              color="white"
              p={4}
              align="center"
              boxShadow="md"
            >
              <HStack spacing={3}>
                <ChatIcon boxSize={6} />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" fontSize="lg">Chat App</Text>
                  <HStack spacing={1}>
                    <Box w={2} h={2} bg="green.400" borderRadius="full" />
                    <Text fontSize="xs">Đang hoạt động</Text>
                  </HStack>
                </VStack>
              </HStack>

              <Spacer />

              <HStack spacing={2}>
                <IconButton
                  icon={<PhoneIcon />}
                  variant="ghost"
                  color="white"
                  size="sm"
                  onClick={() => toast({
                    title: "Tính năng cuộc gọi",
                    description: "Tính năng này sẽ được phát triển trong tương lai!",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                  })}
                />
                <IconButton
                  icon={<InfoIcon />}
                  variant="ghost"
                  color="white"
                  size="sm"
                  onClick={() => toast({
                    title: "Thông tin",
                    description: "Đây là ứng dụng chat demo với Chakra UI!",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                  })}
                />
                <IconButton
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  color="white"
                  size="sm"
                />
              </HStack>
            </Flex>

            {/* Messages Area */}
            <Box
              flex={1}
              w="100%"
              bg={chatBg}
              overflowY="auto"
              px={4}
              py={4}
            >
              <VStack spacing={0} align="stretch">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {isTyping && (
                  <Flex justify="flex-start" mb={4} align="flex-end">
                    <Avatar size="sm" src="https://bit.ly/sage-adebayo" mr={2} />
                    <Box
                      bg={useColorModeValue("gray.100", "gray.700")}
                      px={4}
                      py={2}
                      borderRadius="lg"
                      borderBottomLeftRadius="sm"
                    >
                      <HStack spacing={1}>
                        <Box w={2} h={2} bg="gray.400" borderRadius="full" animation="pulse 1.5s infinite" />
                        <Box w={2} h={2} bg="gray.400" borderRadius="full" animation="pulse 1.5s infinite 0.5s" />
                        <Box w={2} h={2} bg="gray.400" borderRadius="full" animation="pulse 1.5s infinite 1s" />
                      </HStack>
                    </Box>
                  </Flex>
                )}

                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            {/* Input Area */}
            <Box w="100%" bg={chatBg} p={4} borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
              <HStack spacing={2}>
                <IconButton
                  icon={<AttachmentIcon />}
                  variant="ghost"
                  size="sm"
                  onClick={() => toast({
                    title: "Đính kèm file",
                    description: "Tính năng đính kèm file sẽ được phát triển!",
                    status: "info",
                    duration: 2000,
                    isClosable: true,
                  })}
                />

                <InputGroup flex={1}>
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    bg={inputBg}
                    border="1px"
                    borderColor={useColorModeValue("gray.300", "gray.600")}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce"
                    }}
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={handleSendMessage}
                      isDisabled={!newMessage.trim()}
                      mr={1}
                    >
                      Gửi
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </HStack>

              <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.400")} mt={2} textAlign="center">
                Nhấn Enter để gửi tin nhắn • Ứng dụng chat demo với Chakra UI
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default ChatApp;
