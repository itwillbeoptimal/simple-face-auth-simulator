import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LoginHeader.styles';
import BackIcon from '@/assets/icons/back.svg?react';

const LoginHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    void navigate('/');
  };

  return (
    <S.Container>
      <S.BackButton onClick={handleBack}>
        <BackIcon />
      </S.BackButton>
    </S.Container>
  );
};

export default LoginHeader;
