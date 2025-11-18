import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RNFileObject } from './RNFileObject';

export type RootStackParamList = {
  Login: undefined;
  SignUp: {
    capturedFace?: RNFileObject;
  };
  FaceCapture: {
    returnTo: 'SignUp';
  };
  My: undefined;
  ProfileEdit: undefined;
  AccountInfo: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<
  RootStackParamList,
  T
>;

export type RouteProps<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
