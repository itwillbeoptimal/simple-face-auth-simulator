import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import StyledText from '@/components/StyledText';

export const StyledButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${props => props.theme.COLORS.MAIN.PRIMARY};
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  border-radius: 12px;
`;

export const ButtonText = styled(StyledText)`
  font-size: 18px;
`;
