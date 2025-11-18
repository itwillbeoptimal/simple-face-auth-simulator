import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const ChipContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Chip = styled(TouchableOpacity)<{ selected: boolean }>`
  padding: 12px 16px;
  border-radius: 20px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.COLORS.MAIN.SECONDARY : theme.COLORS.SURFACE};
`;

export const ChipText = styled(StyledText)<{ selected: boolean }>`
  color: ${({ theme, selected }) =>
    selected ? theme.COLORS.MAIN.PRIMARY : theme.COLORS.LABEL.PRIMARY};
  font-family: system-ui;
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
`;
