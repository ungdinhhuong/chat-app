import {Button, Heading, Input, Link, Stack, Text} from "@chakra-ui/react";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout.jsx";
import {useState} from "react";
import {register} from "@/features/auth/authService.js";
import {toast} from "react-toastify";
import {ROUTE} from "@/consts/ROUTE.js";

const RegisterPage = () => {
  const [user, setUser] = useState({
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin@gmail.com'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await register(user);
    if (response && !response.success) {
      setError(response.message || 'Đăng ký thất bại');
      return;
    }
    toast.success('Đăng ký thành công');
    navigate(ROUTE.AUTH.LOGIN);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <AuthLayout>
      <Stack spacing={4}>
        <Heading textAlign="center">Đăng ký</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={user.username}
            onChange={handleChange}
            placeholder="Nhập usernamme"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={user.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Mật khẩu</FormLabel>
          <Input
            type="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />
        </FormControl>
        <Text textStyle="sm" color="red.500" textAlign="center">{error}</Text>
        <Button colorPalette="teal" onClick={handleSubmit}>
          Đăng ký
        </Button>
        <Text textStyle="sm" textAlign="center">Bạn đã có tài khoản? <Link as={RouterLink} to={ROUTE.AUTH.LOGIN} color="teal.500">Đăng
          nhập</Link></Text>
      </Stack>
    </AuthLayout>
  )
}

export default RegisterPage
