import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as S from './Button.styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, disabled, ...props }) => {
  return (
    <S.StyledButton disabled={disabled} {...props}>
      <S.ButtonText weight="MEDIUM">{title}</S.ButtonText>
    </S.StyledButton>
  );
};

export default Button;
