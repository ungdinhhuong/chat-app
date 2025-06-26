import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {ChatMessageBubbleProps} from "@/features/chat/types/message.type";
import {useSelector} from "react-redux";
import {selectUser} from "@/features/auth/authSelectors";
import {format, parseISO} from "date-fns";
import React from "react";

export const ChatMessageBubble = ({msg, isFirstInGroup, isLastInGroup, created}: ChatMessageBubbleProps) => {
  const user = useSelector(selectUser);

  const message = msg.content;
  const isOwnMessage = msg.sender?.id === user?.id;
  const sender = msg.sender?.username || "..."

  return (
    <HStack justify={isOwnMessage ? "flex-end" : "flex-start"} w="100%" mb={2}>
      <VStack align={isOwnMessage ? "flex-end" : "flex-start"} gap={1}>
        {!isOwnMessage && isFirstInGroup && (<Text fontSize="xs" color="gray.500" ml={2}>
          {sender}
        </Text>)}
        <Box
          bg={isOwnMessage ? "blue.500" : "white"}
          color={isOwnMessage ? "white" : "black"}
          px={4}
          py={2}
          borderRadius="lg"
          maxW="300px"
        >
          <Text>{message}</Text>
        </Box>
        {isLastInGroup && (
          <Text fontSize="xs" color="gray.500" ml={2}>{format(parseISO(created), 'HH:mm')}</Text>
        )}
      </VStack>
    </HStack>
  );
};
