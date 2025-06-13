import { Box, Flex } from '@chakra-ui/react';

export default function AuthLayout({ children }) {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100" p={4}>
      <Box
        w="full"
        maxW="400px"
        bg="white"
        p={8}
        rounded="md"
        boxShadow="lg"
      >
        {children}
      </Box>
    </Flex>
  );
}
