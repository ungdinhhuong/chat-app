import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/auth/authSelectors';
import {SOCKET_EVENT} from "@/consts/socket-events";
import socket from "@/services/socket";
import {userService} from "@/features/user/services/user.service";
import {UserPayload} from "@/features/user/types/user.type";

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserPayload[]>([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      const usersOnline = await userService.getUserOnline();
      setOnlineUsers(usersOnline.data);
    };

    if (!user?.id) return;

    socket.on(SOCKET_EVENT.ONLINE_USERS, fetchOnlineUsers);

    fetchOnlineUsers();

    return () => {
      socket.off(SOCKET_EVENT.ONLINE_USERS, setOnlineUsers);
    };
  }, [user?.id]);



  return onlineUsers;
};
