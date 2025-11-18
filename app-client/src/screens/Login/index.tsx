import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSetAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuthenticatedAtom } from '@/atoms/authAtom';
import type { NavigationProp } from '@/types/Navigation';
import type { ValidationErrors } from '@/types/Errors';
import useLogin from '@/hooks/useLogin';
import { validateEmail } from '@/utils/validators';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import Input from '@/components/Input';
import Button from '@/components/Button';
import * as S from './Login.styles';
import RightArrowIcon from '@/assets/icons/right-arrow.svg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const loginMutation = useLogin();
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

  const navigation = useNavigation<NavigationProp<'Login'>>();

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    if (!password.trim()) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const result = await loginMutation.mutateAsync({ email, password });

      await AsyncStorage.setItem('accessToken', result.accessToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
      await AsyncStorage.setItem('userId', result.user.id);
      await AsyncStorage.setItem('userName', result.user.name);
      await AsyncStorage.setItem('userEmail', result.user.email);

      setIsAuthenticated(true);
      navigation.navigate('My');
    } catch {
      Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해 주세요');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp', { capturedFace: undefined });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <S.Container>
        <S.Content>
          <S.Title weight="SEMI_BOLD">로그인</S.Title>
          <Input
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <Input
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />
          <S.LoginButtonWrapper>
            <Button title="로그인" onPress={handleLogin} />
          </S.LoginButtonWrapper>
          <S.SignUpText>아직 계정이 없으신가요?</S.SignUpText>
          <S.SignUpButton onPress={handleSignUp}>
            <S.SignUpButtonText>회원가입</S.SignUpButtonText>
            <RightArrowIcon />
          </S.SignUpButton>
        </S.Content>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default Login;
