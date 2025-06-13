import {Button, Heading, Input, Stack, Text,} from '@chakra-ui/react';
import {useState} from 'react';
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {toast} from 'react-toastify';
import AuthLayout from "@/components/layout/AuthLayout";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authService} from "@/features/auth/authService";
import {loginSuccess} from "@/features/auth/authSlice";
import {ROUTE} from "@/consts/ROUTE";
import {AppLink} from "@/components/RouterLink";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@gmail.com',
      password: 'admin@gmail.com',
    },
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const executeSubmit = async (values: FormData) => {
    const response = await authService.login(values.email, values.password);
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
      <form onSubmit={handleSubmit(executeSubmit)}>
        <Stack gap={4}>
          <Heading textAlign="center">Đăng nhập</Heading>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} placeholder="Nhập email"/>
            <Text color="red.500" fontSize="sm">{errors.email?.message}</Text>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Mật khẩu</FormLabel>
            <Input type="password" {...register('password')} placeholder="Nhập mật khẩu"/>
            <Text color="red.500" fontSize="sm">{errors.password?.message}</Text>
          </FormControl>
          <Text textStyle="sm" color="red.500" textAlign="center">{error}</Text>
          <Button colorScheme="teal" type="submit" loading={isSubmitting}>
            Đăng nhập
          </Button>

          <Text textStyle="sm" textAlign="center">Chưa có tài khoản? <AppLink to={ROUTE.AUTH.REGISTER} color="teal.500">Đăng
            ký</AppLink></Text>
        </Stack>
      </form>
    </AuthLayout>
  );
}

export default LoginPage
