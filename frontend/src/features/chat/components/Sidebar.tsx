import {Avatar, Box, Flex, IconButton, Spacer, Text} from "@chakra-ui/react";
import React from "react";
import {ColorModeButton} from "@/components/ui/color-mode";
import {CiLogout} from "react-icons/ci";
import {RoomList} from "./RoomList";
import {OnlineUserList} from "@/features/chat/components/OnlineUserList";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "@/features/auth/authSelectors";
import {User} from "@/features/auth/types/auth.type";
import {logout} from "@/features/auth/authSlice";
import {toast} from "react-toastify";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser) as User;

  const executeLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công")
  }

  return (
    <Flex direction="column" justify="space-between" h="100%" w="300px" borderRightWidth="1px" borderColor="gray.200">
      <Box>
        <Flex align="center" p={4} borderBottomWidth="1px" borderColor="gray.200">
          <Avatar.Root>
            <Avatar.Fallback name="admin"/>
            <Avatar.Image
              src="https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg" {...({} as any)} />
          </Avatar.Root>
          <Text fontWeight="bold" px={4}>{user.username}</Text>
          <Spacer/>
          <ColorModeButton/>
          <IconButton onClick={executeLogout} size="sm" variant={'outline'} aria-label="Settings">
            <CiLogout/>
          </IconButton>
        </Flex>
        <RoomList/>
      </Box>
      <OnlineUserList/>
    </Flex>
  )
}
