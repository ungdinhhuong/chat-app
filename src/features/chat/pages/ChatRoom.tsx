import React from "react";
import {Flex, Text,} from "@chakra-ui/react";
import {Sidebar} from "@/features/chat/components/Sidebar";

const ChatRoom = () => {
  return (
    <Flex h="100vh">
      <Sidebar/>
      <Flex flex={1} align="center" justify="center">
        <Text color="gray.500">Chọn một phòng chat để bắt đầu</Text>
      </Flex>
    </Flex>
  )
};

export default ChatRoom;
