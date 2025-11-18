import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NavigationProp } from '@/types/Navigation';
import SafeLayout from '@/components/SafeLayout';
import Header from '@/components/Header';
import * as S from './AccountInfo.styles';

const AccountInfo: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'AccountInfo'>>();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
      const userName = await AsyncStorage.getItem('userName');
      const userEmail = await AsyncStorage.getItem('userEmail');

      if (!token || !userId) {
        navigation.navigate('Login');
        return;
      }

      setUserInfo({
        name: userName || '',
        email: userEmail || '',
      });
    } catch {
      Alert.alert('사용자 정보 불러오기 실패', '사용자 정보를 불러오는데 실패했습니다');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userInfo) {
    return null;
  }

  return (
    <SafeLayout>
      <Header title="계정 정보" showBackButton={true} />
      <S.Content>
        <S.Section>
          <S.InfoRow>
            <S.InfoLabel>이름</S.InfoLabel>
            <S.InfoValue>{userInfo.name}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow isLast>
            <S.InfoLabel>이메일</S.InfoLabel>
            <S.InfoValue>{userInfo.email}</S.InfoValue>
          </S.InfoRow>
        </S.Section>
      </S.Content>
    </SafeLayout>
  );
};

export default AccountInfo;
