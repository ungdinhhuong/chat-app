import {Box, HStack, Text} from "@chakra-ui/react";
import React from "react";
import {useOnlineUsers} from "@/features/chat/hooks/useOnlineUsers";
import {FaUserTie} from "react-icons/fa";

export const OnlineUserList = () => {
  const onlineUsers = useOnlineUsers();

  return (
    <Box borderTopWidth="1px" fontSize={'sm'} borderColor={"gray.200"} p={4} mt={4}>
      <Text mb={2}>
        Đang online ({onlineUsers.length})
      </Text>
      {onlineUsers.map((user) => {
        const Icon = FaUserTie;
        return (
          <HStack key={user.username} gap={2} mb={2} position="relative">
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
            <Text>{user.username}</Text>
          </HStack>
        );
      })}
    </Box>
  )
}
