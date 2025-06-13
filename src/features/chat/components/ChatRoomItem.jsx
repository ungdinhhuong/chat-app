import { Box, Flex, Text, Badge } from '@chakra-ui/react'

export function ChatRoomItem({ title, message, time, unreadCount, isActive, onClick }) {
  return (
    <Box
      p={3}
      borderRadius="lg"
      bg={isActive ? 'blue.50' : 'white'}
      boxShadow="sm"
      _hover={{ bg: isActive ? 'blue.100' : 'gray.50' }}
      cursor="pointer"
      onClick={onClick}
    >
      <Flex justify="space-between" align="center" mb={1}>
        <Text fontWeight="semibold" fontSize="sm" color="black">
          {title}
        </Text>
        <Flex gap={2} align="center">
          <Text fontSize="xs" color="gray.500">
            {time}
          </Text>
          {unreadCount > 0 && (
            <Badge
              bg="blue.500"
              color="white"
              fontSize="xs"
              px={2}
              borderRadius="full"
            >
              {unreadCount}
            </Badge>
          )}
        </Flex>
      </Flex>
      <Text fontSize="sm" color="gray.600" noOfLines={1}>
        {message}
      </Text>
    </Box>
  )
}
