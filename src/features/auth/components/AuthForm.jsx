import {
  Box,
  Button,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import {FormControl, FormLabel} from "@chakra-ui/form-control";

const AuthForm = ({ type = 'login', onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            {type === 'login' ? 'Login' : 'Register'}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default AuthForm
