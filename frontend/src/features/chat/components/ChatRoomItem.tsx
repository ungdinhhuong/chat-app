import { Box, Flex, Text, Badge } from '@chakra-ui/react'

type ChatRoomItemProps = {
  title: string;
  message: string;
  time: string;
  unreadCount: number;
  isActive: boolean;
  onClick: () => void;
};

export function ChatRoomItem({ title, message, time, unreadCount, isActive, onClick }: ChatRoomItemProps) {
  return (
    <Box
      p={3}
      borderRadius="lg"
      bg={isActive ? 'blue.50' : 'white'}
      border="1px solid" borderColor={'gray.200'}
      _hover={{ bg: isActive ? 'blue.100' : 'gray.50' }}
      cursor="pointer"
      onClick={onClick}
    >
      <Flex justify="space-between" align="center" mb={1}>
        <Text fontWeight="semibold" fontSize="sm" color="black" lineClamp={1}>
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
      <Text fontSize="sm" color="gray.600" lineClamp={1}>
        {message}
      </Text>
    </Box>
  )
}
