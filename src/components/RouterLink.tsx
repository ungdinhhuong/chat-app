// 📄 components/RouterLink.tsx
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

type Props = LinkProps & { to: string }

export const AppLink = (props: Props) => (
  <ChakraLink as={RouterLink} {...props} />
)
