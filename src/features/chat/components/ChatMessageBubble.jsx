import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {FaCheck} from "react-icons/fa";

export const ChatMessageBubble = ({message, time, isOwnMessage = false, sender, seen = false,}) => {
  return (
    <HStack justify={isOwnMessage ? "flex-end" : "flex-start"} w="100%" mb={2}>
      <VStack align={isOwnMessage ? "flex-end" : "flex-start"} spacing={1}>
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
        <HStack spacing={1} fontSize="xs" color="gray.400">
          <Text>{time}</Text>
          {isOwnMessage && seen && (<HStack spacing="1px">
            <FaCheck w={3} h={3} color="blue.300"/>
          </HStack>)}
        </HStack>
      </VStack>
    </HStack>
  );
};
