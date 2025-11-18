import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@/components/StyledText';

export const Content = styled.View`
  flex: 1;
  padding: 4px 16px 16px 16px;
`;

export const MenuButton = styled(TouchableOpacity)<{ isLast?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 8px;
  border-bottom-width: ${props => (props.isLast ? '0' : '1px')};
  border-bottom-color: ${props => props.theme.COLORS.LABEL.TERTIARY};
`;

export const MenuButtonText = styled(StyledText)`
  font-size: 16px;
`;
