import { Box, Text } from '@chakra-ui/react'

const ChatHeader = () => {
  return (
    <Box px={4} py={2} borderBottom="1px solid #eee">
      <Text fontWeight="bold">Chat Room</Text>
    </Box>
  )
}

export default ChatHeader
