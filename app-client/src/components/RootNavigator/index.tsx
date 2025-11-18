import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAuthenticatedAtom } from '@/atoms/authAtom';
import type { RootStackParamList } from '@/types/Navigation';
import Login from '@/screens/Login';
import SignUp from '@/screens/SignUp';
import FaceCapture from '@/screens/FaceCapture';
import My from '@/screens/My';
import ProfileEdit from '@/screens/ProfileEdit';
import AccountInfo from '@/screens/AccountInfo';

const Stack = createStackNavigator<RootStackParamList>();

const NavigationObserver = () => {
  const navigation = useNavigation();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    if (!isAuthenticated) {
      const state = navigation.getState();
      const currentRoute = state?.routes[state.index]?.name;

      if (currentRoute !== 'Login') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
      }
    }
  }, [isAuthenticated, navigation]);

  return null;
};

const RootNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('userId');

        if (token && userId) {
          setIsAuthenticated(true);
          setInitialRoute('My');
        } else {
          setIsAuthenticated(false);
          setInitialRoute('Login');
        }
      } catch {
        setIsAuthenticated(false);
        setInitialRoute('Login');
      }
    };

    checkAuthStatus();
  }, [setIsAuthenticated]);

  if (!initialRoute) {
    return null;
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FaceCapture" component={FaceCapture} />
        <Stack.Screen name="My" component={My} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
      </Stack.Navigator>
      <NavigationObserver />
    </>
  );
};

export default RootNavigator;
