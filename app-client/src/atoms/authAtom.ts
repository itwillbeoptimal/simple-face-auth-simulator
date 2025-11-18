import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '@/apis/authApi';

export const isAuthenticatedAtom = atom<boolean>(true);

export const logoutAtom = atom(null, async (_get, set) => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (refreshToken) {
    await logout(refreshToken);
  }

  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('userId');
  await AsyncStorage.removeItem('userName');
  await AsyncStorage.removeItem('userEmail');

  set(isAuthenticatedAtom, false);
});
