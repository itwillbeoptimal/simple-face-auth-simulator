import React from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import * as S from './BasicInfoStep.styles';

interface BasicInfoStepProps {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onNext: () => void;
  errors: {
    email?: string;
    password?: string;
    passwordConfirm?: string;
    name?: string;
  };
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  email,
  password,
  passwordConfirm,
  name,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onNameChange,
  onNext,
  errors,
}) => {
  return (
    <S.Container>
      <S.Title weight="SEMI_BOLD">기본 정보</S.Title>
      <S.Subtitle>회원가입을 위해 기본 정보를 입력해 주세요</S.Subtitle>
      <S.ScrollContainer>
        <S.Form>
          <S.FieldWrapper>
            <S.InputLabel>이메일</S.InputLabel>
            <Input
              placeholder="example@email.com"
              value={email}
              onChangeText={onEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.InputLabel>이름</S.InputLabel>
            <Input
              placeholder="이름을 입력해 주세요"
              value={name}
              onChangeText={onNameChange}
              error={errors.name}
            />
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.InputLabel>비밀번호</S.InputLabel>
            <Input
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChangeText={onPasswordChange}
              secureTextEntry
              error={errors.password}
            />
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.InputLabel>비밀번호 확인</S.InputLabel>
            <Input
              placeholder="비밀번호를 다시 입력해 주세요"
              value={passwordConfirm}
              onChangeText={onPasswordConfirmChange}
              secureTextEntry
              error={errors.passwordConfirm}
            />
          </S.FieldWrapper>
        </S.Form>
      </S.ScrollContainer>
      <Button title="다음" onPress={onNext} />
    </S.Container>
  );
};

export default BasicInfoStep;
