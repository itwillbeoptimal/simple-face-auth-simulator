import { View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const Container = styled(View)`
  flex: 1;
`;

export const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const IconWrapper = styled(View)`
  margin-bottom: 8px;
`;

export const Title = styled(StyledText)`
  font-size: 28px;
  letter-spacing: -1px;
  text-align: center;
`;

export const Message = styled(StyledText)`
  font-size: 16px;
  letter-spacing: -0.5px;
  text-align: center;
  line-height: 24px;
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
`;
