import {Button, Heading, Input, Stack, Text} from "@chakra-ui/react";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import AuthLayout from "@/components/layout/AuthLayout";
import React, {useState} from "react";
import {authService} from "@/features/auth/auth.service";
import {toast} from "react-toastify";
import {ROUTE} from "@/consts/ROUTE";
import {AppLink} from "@/components/RouterLink";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

export const registerSchema = z.object({
  user: z.object({
    username: z.string(),
    email: z.string().nonempty().email(),
    password: z.string().nonempty().min(6),
  })
})

type FormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      user: {
        username: '',
        email: '',
        password: '',
      }
    },
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const executeSubmit = async (values: FormData) => {
    const response = await authService.register(values.user);
    if (response && !response.success) {
      setError(response.message || 'Đăng ký thất bại');
      return;
    }
    toast.success('Đăng ký thành công');
    navigate(ROUTE.AUTH.LOGIN);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(executeSubmit)}>
        <Stack gap={4}>
          <Heading textAlign="center">Đăng ký</Heading>
          <FormControl isInvalid={!!errors.user?.username}>
            <FormLabel>Username</FormLabel>
            <Input {...register('user.username')} onFocus={() => setError('')} placeholder="Nhập username"/>
            <Text color="red.500" fontSize="sm">{errors.user?.username?.message}</Text>
          </FormControl>
          <FormControl isInvalid={!!errors.user?.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register('user.email')} onFocus={() => setError('')} placeholder="Nhập email"/>
            <Text color="red.500" fontSize="sm">{errors.user?.email?.message}</Text>
          </FormControl>
          <FormControl isInvalid={!!errors.user?.password}>
            <FormLabel>Mật khẩu</FormLabel>
            <Input type="password" {...register('user.password')} onFocus={() => setError('')}
                   placeholder="Nhập mật khẩu"/>
            <Text color="red.500" fontSize="sm">{errors.user?.password?.message}</Text>
          </FormControl>
          {error && <Text textStyle="sm" color="red.500" textAlign="center">{error}</Text>}
          <Button colorPalette="teal" type="submit" loading={isSubmitting}>
            Đăng ký
          </Button>
          <Text textStyle="sm" textAlign="center">Bạn đã có tài khoản? <AppLink to={ROUTE.AUTH.LOGIN} color="teal.500">Đăng
            nhập</AppLink></Text>
        </Stack>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
