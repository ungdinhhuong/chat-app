import { Box, VStack, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const ChatMessages = () => {
  const messages = useSelector((state) => state.chat.messages)

  return (
    <Box flex={1} p={4} overflowY="auto">
      <VStack align="start" spacing={2}>
        {messages.map((msg, index) => (
          <Box key={index} bg="gray.100" p={2} borderRadius="md">
            <Text fontWeight="bold">{msg.user}</Text>
            <Text>{msg.text}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default ChatMessages
