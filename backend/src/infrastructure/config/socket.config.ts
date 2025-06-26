export const socketGatewayOptions = {
  cors: {
    origin: process.env.SOCKET_FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  path: process.env.SOCKET_PATH || '/socket.io',
  transports: ['websocket'],
};
