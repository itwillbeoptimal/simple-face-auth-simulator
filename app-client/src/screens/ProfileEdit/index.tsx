import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@/types/Navigation';
import { changePassword } from '@/apis/userApi';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import SafeLayout from '@/components/SafeLayout';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import * as S from './ProfileEdit.styles';

const ProfileEdit: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'ProfileEdit'>>();

  const {
    currentPassword,
    newPassword,
    confirmPassword,
    passwordErrors,
    validating,
    hasPasswordChange,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    isPasswordValid,
    validateAllPasswords,
    resetPassword,
  } = usePasswordValidation();

  const handleSave = async () => {
    if (hasPasswordChange) {
      const valid = await validateAllPasswords();
      if (!valid) return;

      try {
        await changePassword({ currentPassword, newPassword });
        resetPassword();
        Alert.alert('저장 완료', '비밀번호가 변경되었습니다.', [
          { text: '확인', onPress: () => navigation.goBack() },
        ]);
      } catch {
        Alert.alert('저장 실패', '비밀번호 변경에 실패했습니다.');
      }
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeLayout>
      <Header title="프로필 수정" showBackButton={true} />
      <S.ScrollContainer>
        <S.FieldWrapper>
          <S.InputLabel>현재 비밀번호</S.InputLabel>
          <Input
            placeholder="현재 비밀번호를 입력해주세요"
            value={currentPassword}
            onChangeText={handleCurrentPasswordChange}
            secureTextEntry
            error={passwordErrors.currentPassword}
          />
        </S.FieldWrapper>
        <S.FieldWrapper>
          <S.InputLabel>새 비밀번호</S.InputLabel>
          <Input
            placeholder="새 비밀번호를 입력해주세요"
            value={newPassword}
            onChangeText={handleNewPasswordChange}
            secureTextEntry
            error={passwordErrors.newPassword}
          />
        </S.FieldWrapper>
        <S.FieldWrapper>
          <S.InputLabel>새 비밀번호 확인</S.InputLabel>
          <Input
            placeholder="새 비밀번호를 다시 입력해주세요"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry
            error={passwordErrors.confirmPassword}
          />
        </S.FieldWrapper>
      </S.ScrollContainer>
      <S.SaveButtonWrapper>
        <Button
          title={validating ? '확인 중...' : '저장'}
          onPress={handleSave}
          disabled={hasPasswordChange && !isPasswordValid()}
        />
      </S.SaveButtonWrapper>
    </SafeLayout>
  );
};

export default ProfileEdit;
