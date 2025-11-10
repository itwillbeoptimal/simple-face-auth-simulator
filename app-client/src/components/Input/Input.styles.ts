import styled from 'styled-components/native';
import { View, TextInput, Text } from 'react-native';

export const Container = styled(View)`
  width: 100%;
  margin-bottom: 16px;
`;

export const StyledInput = styled(TextInput)<{ hasError: boolean }>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-width: 1px;
  border-color: ${props =>
    props.hasError ? props.theme.COLORS.LABEL.ALERT : props.theme.COLORS.SURFACE};
  border-radius: 8px;
  font-size: 16px;
  background-color: ${props => props.theme.COLORS.SURFACE};
  color: ${props => props.theme.COLORS.LABEL.PRIMARY};
`;

export const ErrorText = styled(Text)`
  margin-top: 4px;
  margin-left: 4px;
  color: ${props => props.theme.COLORS.LABEL.ALERT};
  font-size: 12px;
`;
