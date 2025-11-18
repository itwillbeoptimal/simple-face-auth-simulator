import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/authApi';
import type { LoginRequest, LoginResponse } from '@/types/Auth';

const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
};

export default useLogin;
