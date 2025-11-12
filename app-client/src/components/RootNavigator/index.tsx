import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/Navigation';
import SignUp from '@/screens/SignUp';
import FaceCapture from '@/screens/FaceCapture';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="FaceCapture" component={FaceCapture} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
