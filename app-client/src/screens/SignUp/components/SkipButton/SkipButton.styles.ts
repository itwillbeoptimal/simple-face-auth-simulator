import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import StyledText from '@/components/StyledText';

export const StyledButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  gap: 8px;
`;

export const ButtonText = styled(StyledText)`
  font-size: 18px;
  color: ${props => props.theme.COLORS.LABEL.SECONDARY};
`;
