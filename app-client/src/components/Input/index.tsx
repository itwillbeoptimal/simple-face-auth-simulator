import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './Input.styles';

interface InputProps extends TextInputProps {
  error?: string;
}

const Input: React.FC<InputProps> = ({ error, ...props }) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.StyledInput
        hasError={!!error}
        placeholderTextColor={theme.COLORS.LABEL.SECONDARY}
        {...props}
      />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
};

export default Input;
