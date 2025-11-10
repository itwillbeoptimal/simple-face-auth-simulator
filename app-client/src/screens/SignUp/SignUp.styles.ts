import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.COLORS.BACKGROUND};
`;

export const ProgressBar = styled(View)`
  flex-direction: row;
  padding: 16px 24px;
  gap: 8px;
`;

export const ProgressStep = styled(View)<{ active: boolean }>`
  flex: 1;
  height: 4px;
  background-color: ${props =>
    props.active ? props.theme.COLORS.MAIN.PRIMARY : props.theme.COLORS.LABEL.TERTIARY};
  border-radius: 2px;
`;

export const Content = styled(View)`
  flex: 1;
  padding: 24px;
`;
