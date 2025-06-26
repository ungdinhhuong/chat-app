import { io } from 'socket.io-client';
import {getAccessTokenFromPersist} from "@/utils/storage.utils";

const token = getAccessTokenFromPersist();

const socket = io(import.meta.env.VITE_SOCKET_URL!, {
  auth: {
    token,
  },
  transports: ['websocket'],
  path: '/socket.io',
});

export default socket;
