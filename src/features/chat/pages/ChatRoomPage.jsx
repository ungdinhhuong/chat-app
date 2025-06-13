// import { Box, Grid } from '@chakra-ui/react'
// import ChatHeader from '../components/ChatHeader'
// import ChatMessages from '../components/ChatMessages'
// import ChatInput from '../components/ChatInput'
// import RoomList from '@/features/rooms/components/RoomList'
// import OnlineUserList from '@/features/online/components/OnlineUserList'
//
// const ChatRoomPage = () => {
//   return (
//     <Grid templateColumns="240px 1fr 200px" h="100vh">
//       <Box borderRight="1px solid #eee">
//         <RoomList />
//       </Box>
//       <Box display="flex" flexDir="column">
//         <ChatHeader />
//         <ChatMessages />
//         <ChatInput />
//       </Box>
//       <Box borderLeft="1px solid #eee">
//         <OnlineUserList />
//       </Box>
//     </Grid>
//   )
// }
//
// export default ChatRoomPage

import { Box, Flex } from '@chakra-ui/react'
import RoomList from '@/features/rooms/components/RoomList'
import OnlineUserList from '@/features/online/components/OnlineUserList'
import ChatMessages from '@/features/chat/components/ChatMessages'
import ChatInput from '@/features/chat/components/ChatInput'

const ChatRoomPage = () => {
  return (
    <Flex h="100vh">
      <Box w="20%">
        <RoomList />
      </Box>
      <Box flex={1} display="flex" flexDirection="column">
        <ChatMessages />
        <ChatInput />
      </Box>
      <Box w="20%">
        <OnlineUserList />
      </Box>
    </Flex>
  )
}

export default ChatRoomPage
