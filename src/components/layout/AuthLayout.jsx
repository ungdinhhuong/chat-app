import {Box, Flex} from '@chakra-ui/react';
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

export default function AuthLayout({children}) {
  return (
    <Flex direction="column" minH="100vh" bg="gray.100">
      <Box minW="100vw">
        <Navbar/>
      </Box>
      <Flex flex="1" justifyContent="center" alignItems="center" bg="gray.100">
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
      <Box minW="100vw">
        <Footer/>
      </Box>
    </Flex>
  );
}
