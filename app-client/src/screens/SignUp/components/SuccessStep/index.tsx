import React from 'react';
import * as S from './SuccessStep.styles';
import Button from '@/components/Button';
import CheckIcon from '@/assets/icons/check.svg';

interface SuccessStepProps {
  userName: string;
  onComplete: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ userName, onComplete }) => {
  return (
    <S.Container>
      <S.Content>
        <S.IconWrapper>
          <CheckIcon width={84} height={84} />
        </S.IconWrapper>
        <S.Title weight="SEMI_BOLD">환영합니다!</S.Title>
        <S.Message>
          {userName} 님의 회원가입이{'\n'}
          성공적으로 완료되었습니다.
        </S.Message>
      </S.Content>
      <Button title="확인" onPress={onComplete} />
    </S.Container>
  );
};

export default SuccessStep;
