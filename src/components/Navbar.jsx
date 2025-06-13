import React from 'react';
import {Box, Button, Flex, HStack, Spacer, Text} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';
import {ROUTE} from "@/consts/ROUTE.js";

const Navbar = () => {
  return (
    <Box bg="white" px={6} py={4} boxShadow="sm">
      <Flex align="center">
        <Text fontWeight="bold" fontSize="lg" mr={8}>
          Logo
        </Text>

        {/*<HStack spacing={6} fontSize="sm" color="gray.600">*/}
        {/*  <Flex gap="32px">*/}
        {/*    <RouterLink to="/inspiration">Inspiration</RouterLink>*/}
        {/*    <RouterLink to="/find-work">Find Work</RouterLink>*/}
        {/*    <RouterLink to="/learn-design">Learn Design</RouterLink>*/}
        {/*    <RouterLink to="/hire-designers">Hire Designers</RouterLink>*/}
        {/*  </Flex>*/}
        {/*</HStack>*/}

        <Spacer/>

        {/* Auth Actions */}
        <HStack spacing={4}>
          <Button as={RouterLink} to={ROUTE.AUTH.LOGIN} variant="link" color="gray.600" _hover={{color: 'teal.500'}} size="sm">
            Đăng nhập
          </Button>
          <Button
            as={RouterLink}
            to={ROUTE.AUTH.REGISTER}
            bg="teal.500"
            color="white"
            _hover={{bg: 'teal.600'}}
            size="sm"
            borderRadius="md"
          >
            Đăng ký
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
