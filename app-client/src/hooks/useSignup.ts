import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/apis/authApi';
import type { SignUpRequest, SignUpResponse } from '@/types/Auth';

const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
  });
};

export default useSignUp;
