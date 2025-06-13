import { useSelector } from 'react-redux'
import { Box, VStack, Text } from '@chakra-ui/react'

const OnlineUserList = () => {
  const onlineUsers = useSelector(state => state.online.onlineUsers)

  return (
    <Box w="100%" p={2} borderLeft="1px solid #ccc">
      <Text fontWeight="bold" mb={2}>Online</Text>
      <VStack align="stretch">
        {onlineUsers.map(user => (
          <Text key={user.id} fontSize="sm">{user.name}</Text>
        ))}
      </VStack>
    </Box>
  )
}

export default OnlineUserList
