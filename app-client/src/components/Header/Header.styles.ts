import styled from 'styled-components';
import { TouchableOpacity, View } from 'react-native';
import StyledText from '@/components/StyledText';

export const Container = styled(View)`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Title = styled(StyledText)`
  flex: 2;
  font-size: 16px;
  text-align: center;
`;

export const BackButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: flex-start;
`;

export const RightContent = styled(View)`
  flex: 1;
  align-items: flex-end;
`;
