import { View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const Content = styled.View`
  flex: 1;
  padding: 4px 16px 16px 16px;
`;

export const Section = styled(View)`
  margin-bottom: 24px;
`;

export const InfoRow = styled(View)<{ isLast?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom-width: ${props => (props.isLast ? '0' : '1px')};
  border-bottom-color: ${props => props.theme.COLORS.LABEL.TERTIARY};
`;

export const InfoLabel = styled(StyledText)`
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
`;

export const InfoValue = styled(StyledText)``;
