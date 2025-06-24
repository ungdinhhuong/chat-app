import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {FaCheck} from "react-icons/fa";
import {ChatMessageBubbleProps, MessageStatus} from "@/features/chat/types/message.type";
import {formatTime} from "@/utils/date.utils";
import {useSelector} from "react-redux";
import {selectUser} from "@/features/auth/authSelectors";

export const ChatMessageBubble = ({msg}: ChatMessageBubbleProps) => {
  const user = useSelector(selectUser);

  const message= msg.content;
  const time= msg.updated;
  const isOwnMessage = msg.sender?.id === user?.id;
  const sender= msg.sender?.username || "..."
  const seen = true;

  return (
    <HStack justify={isOwnMessage ? "flex-end" : "flex-start"} w="100%" mb={2}>
      <VStack align={isOwnMessage ? "flex-end" : "flex-start"} gap={1}>
        {!isOwnMessage && (<Text fontSize="xs" color="gray.500" ml={2}>
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
        <HStack gap={1} fontSize="xs" color="gray.400">
          <Text>{time}</Text>
          {isOwnMessage && seen && (<HStack gap="1px">
            <FaCheck size={12} color="blue.300"/>
          </HStack>)}
        </HStack>
        {msg.status === MessageStatus.SENDING ? (
          <Text fontSize="xs" color="gray.400">Đang gửi...</Text>
        ) : (
          <Text fontSize="xs" color="gray.500">{formatTime(new Date(msg.created))}</Text>
        )}

      </VStack>
    </HStack>
  );
};
