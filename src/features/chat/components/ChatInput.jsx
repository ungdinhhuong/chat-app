import { Box, Button, HStack, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../chatSlice'

const ChatInput = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const currentRoom = useSelector((state) => state.rooms.currentRoom)
  const user = useSelector((state) => state.auth.user)

  const handleSend = () => {
    if (text.trim()) {
      dispatch(sendMessage({ room: currentRoom, text, user: user.email }))
      setText('')
    }
  }

  return (
    <Box p={4} borderTop="1px solid #eee">
      <HStack>
        <Input
          placeholder="Nhập tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleSend} colorScheme="teal">
          Gửi
        </Button>
      </HStack>
    </Box>
  )
}

export default ChatInput
