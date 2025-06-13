import {Button, Heading, Input, Link, Stack, Text,} from '@chakra-ui/react';
import {useState} from 'react';
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {toast} from 'react-toastify';
import AuthLayout from "@/components/layout/AuthLayout.jsx";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "@/features/auth/authService.js";
import {loginSuccess} from "@/features/auth/authSlice.js";
import {ROUTE} from "@/consts/ROUTE.js";

const LoginPage = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin@gmail.com');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // Validate email and password

    // Submit login
    const response = await login(email, password);
    if (response && !response.success) {
      setError(response.message || 'Sai tài khoản hoặc mật khẩu');
      toast.error('Sai tài khoản hoặc mật khẩu');
      return;
    }
    dispatch(loginSuccess(response.data));
    toast.success('Đăng nhập thành công');
    navigate(ROUTE.HOME);
  };

  return (
    <AuthLayout>

      <Stack spacing={4}>
        <Heading textAlign="center">Đăng nhập</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Mật khẩu</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </FormControl>
        <Text textStyle="sm" color="red.500" textAlign="center">{error}</Text>
        <Button colorPalette="teal" onClick={handleSubmit}>
          Đăng nhập
        </Button>
        <Text textStyle="sm" textAlign="center">Chưa có tài khoản? <Link as={RouterLink} to={ROUTE.AUTH.REGISTER}
                                                                         color="teal.500">Đăng ký</Link></Text>
      </Stack>
    </AuthLayout>
  );
}

export default LoginPage
