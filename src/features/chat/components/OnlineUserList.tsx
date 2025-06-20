import {Box, HStack, Text} from "@chakra-ui/react";
import React from "react";
import {FaLaptop, FaUserNurse, FaUserTie} from "react-icons/fa";

export const OnlineUserList = () => {
  const users = [
    {name: "admin", icon: FaUserTie},
    {name: "alice", icon: FaLaptop},
    {name: "bob", icon: FaUserNurse},
  ];
  return (
    <Box borderTopWidth="1px" fontSize={'sm'} borderColor={"gray.200"} p={4} mt={4}>
      <Text mb={2}>
        Đang online ({users.length})
      </Text>
      {users.map((user) => {
        const Icon = user.icon;
        return (
          <HStack key={user.name} gap={2} mb={2} position="relative">
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
  )
}
