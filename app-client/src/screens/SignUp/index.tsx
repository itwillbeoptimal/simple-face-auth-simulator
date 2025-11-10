import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NavigationProp, RouteProps } from '@/types/Navigation';
import useSignUp from '@/hooks/useSignUp';
import SafeLayout from '@/components/SafeLayout';
import BasicInfoStep from './components/BasicInfoStep';
import FaceRegistrationStep from './components/FaceRegistrationStep';
import SuccessStep from './components/SuccessStep';
import * as S from './SignUp.styles';

type Step = 'basicInfo' | 'faceRegistration' | 'success';

const STEPS: Step[] = ['basicInfo', 'faceRegistration', 'success'];

const SignUp: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'SignUp'>>();
  const route = useRoute<RouteProps<'SignUp'>>();

  const [currentStep, setCurrentStep] = useState<Step>('basicInfo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    passwordConfirm?: string;
    name?: string;
  }>({});
  const [userName, setUserName] = useState('');

  const capturedFace = route.params?.capturedFace;

  const { mutate: signUp } = useSignUp();

  const validateBasicInfo = (): boolean => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = '이메일을 입력해주세요';
    if (!name) newErrors.name = '이름을 입력해주세요';
    if (!password) newErrors.password = '비밀번호를 입력해주세요';
    if (!passwordConfirm) newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요';
    if (password && passwordConfirm && password !== passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBasicInfoNext = () => {
    if (validateBasicInfo()) {
      setCurrentStep('faceRegistration');
    }
  };

  const handleFaceRegistrationNext = () => {
    navigation.navigate('FaceCapture', { returnTo: 'SignUp' });
  };

  const handleSignUp = (faceImage?: typeof capturedFace) => {
    signUp(
      { email, password, name, faceImage },
      {
        onSuccess: async data => {
          await AsyncStorage.setItem('accessToken', data.accessToken);
          await AsyncStorage.setItem('refreshToken', data.refreshToken);
          await AsyncStorage.setItem('userId', data.user.id);
          await AsyncStorage.setItem('userName', data.user.name);
          await AsyncStorage.setItem('userEmail', data.user.email);
          setUserName(data.user.name);
          setCurrentStep('success');
        },
        onError: error => {
          Alert.alert('회원가입 실패', error.message);
        },
      },
    );
  };

  useEffect(() => {
    if (capturedFace && currentStep === 'faceRegistration') {
      handleSignUp(capturedFace);
    }
  }, [capturedFace]);

  const handleComplete = () => {
    navigation.reset({ index: 0, routes: [{ name: 'My' }] });
  };

  const currentStepIndex = STEPS.indexOf(currentStep);

  if (currentStep === 'success') {
    return (
      <SafeLayout>
        <SuccessStep userName={userName} onComplete={handleComplete} />
      </SafeLayout>
    );
  }

  return (
    <SafeLayout>
      <S.Container>
        <S.ProgressBar>
          {STEPS.filter(s => s !== 'success').map((step, index) => (
            <S.ProgressStep key={step} active={index <= currentStepIndex} />
          ))}
        </S.ProgressBar>
        <S.Content>
          {currentStep === 'basicInfo' && (
            <BasicInfoStep
              email={email}
              password={password}
              passwordConfirm={passwordConfirm}
              name={name}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onPasswordConfirmChange={setPasswordConfirm}
              onNameChange={setName}
              onNext={handleBasicInfoNext}
              errors={errors}
            />
          )}
          {currentStep === 'faceRegistration' && (
            <FaceRegistrationStep
              onNext={handleFaceRegistrationNext}
              onSkip={() => handleSignUp()}
            />
          )}
        </S.Content>
      </S.Container>
    </SafeLayout>
  );
};

export default SignUp;
