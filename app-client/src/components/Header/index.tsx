import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as S from './Header.styles';
import BackIcon from '@/assets/icons/back.svg';

interface HeaderProps {
  title: string;
  rightContent?: React.ReactNode;
  goBack?: () => void;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightContent,
  goBack,
  showBackButton = true
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (goBack) return goBack();
    navigation.goBack();
  };

  return (
    <S.Container>
      {showBackButton ? (
        <S.BackButton onPress={handleGoBack}>
          <BackIcon />
        </S.BackButton>
      ) : (
        <S.BackButton disabled />
      )}
      <S.Title weight="SEMI_BOLD">{title}</S.Title>
      <S.RightContent>{rightContent}</S.RightContent>
    </S.Container>
  );
};

export default Header;
