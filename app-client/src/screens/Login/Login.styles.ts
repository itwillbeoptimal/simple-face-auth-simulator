import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const Container = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.COLORS.BACKGROUND};
`;

export const Content = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`;

export const Title = styled(StyledText)`
  margin-bottom: 32px;
  font-size: 28px;
  text-align: center;
`;

export const LoginButtonWrapper = styled(View)`
  width: 100%;
  margin-top: 12px;
`;

export const SignUpText = styled(StyledText)`
  margin-top: 40px;
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
`;

export const SignUpButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const SignUpButtonText = styled(StyledText)`
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
  font-size: 16px;
  text-decoration: underline solid ${props => props.theme.COLORS.LABEL.SECONDARY};
`;
