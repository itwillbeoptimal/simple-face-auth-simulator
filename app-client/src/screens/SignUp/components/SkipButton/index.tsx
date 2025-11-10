import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './SkipButton.styles.ts';
import SkipIcon from '@/assets/icons/right-arrow.svg';

const Button: React.FC<TouchableOpacityProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <S.StyledButton {...props}>
      <S.ButtonText>건너뛰기</S.ButtonText>
      <SkipIcon fill={theme.COLORS.LABEL.SECONDARY} />
    </S.StyledButton>
  );
};

export default Button;
