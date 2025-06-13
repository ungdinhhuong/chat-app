import {Box, Flex, IconButton, Text} from '@chakra-ui/react';
import {FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa';

export default function Footer() {
  return (
    <Box bg="gray.50" px={8} py={4}>
      <Flex justify="space-between" align="center">
        <Text fontSize="sm">© 2024 Your Company. All rights reserved</Text>
        <Flex gap={4}>
          <IconButton
            aria-label="Twitter"
            variant="outline"
            rounded="full"
          >
            <FaTwitter/>
          </IconButton>

          <IconButton
            icon={<FaYoutube fontSize="20px"/>}
            aria-label="YouTube"
            variant="outline"
            rounded="full"
          />
          <IconButton
            icon={<FaInstagram/>}
            aria-label="Instagram"
            variant="outline"
            rounded="full"
          >
            <FaInstagram/>
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
