import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetAtom } from 'jotai';
import type { NavigationProp } from '@/types/Navigation';
import { logoutAtom } from '@/atoms/authAtom';
import SafeLayout from '@/components/SafeLayout';
import * as S from './My.styles';

const My: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'My'>>();
  const logout = useSetAtom(logoutAtom);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userName').then(name => {
      if (name) setUserName(name);
    });
  }, []);

  const handleAccountInfo = () => {
    navigation.navigate('AccountInfo');
  };

  const handleProfileEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeLayout>
      <S.Content>
        <S.MenuButton onPress={handleAccountInfo}>
          <S.MenuButtonText>{userName ? `${userName} 님` : '계정 정보'}</S.MenuButtonText>
        </S.MenuButton>
        <S.MenuButton onPress={handleProfileEdit}>
          <S.MenuButtonText>프로필 수정</S.MenuButtonText>
        </S.MenuButton>
        <S.MenuButton onPress={handleLogout} isLast>
          <S.MenuButtonText>로그아웃</S.MenuButtonText>
        </S.MenuButton>
      </S.Content>
    </SafeLayout>
  );
};

export default My;
