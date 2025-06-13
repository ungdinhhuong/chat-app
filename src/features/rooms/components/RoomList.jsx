import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRoom } from '../roomsSlice'
import { Box, VStack, Text, Button } from '@chakra-ui/react'

const RoomList = () => {
  const dispatch = useDispatch()
  const rooms = useSelector(state => state.rooms.rooms)
  const currentRoom = useSelector(state => state.rooms.currentRoom)

  return (
    <Box w="100%" p={2} borderRight="1px solid #ccc">
      <VStack align="stretch">
        {rooms.map(room => (
          <Button
            key={room.id}
            variant={currentRoom?.id === room.id ? 'solid' : 'ghost'}
            onClick={() => dispatch(setCurrentRoom(room))}
          >
            {room.name}
          </Button>
        ))}
      </VStack>
    </Box>
  )
}

export default RoomList
