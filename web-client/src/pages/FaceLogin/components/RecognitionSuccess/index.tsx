import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import * as S from './RecognitionSuccess.styles';
import { getUserInfo } from '@/apis/users';
import VerifyLottie from '@/assets/lotties/verify.lottie';
import { recognizedUserIdAtom } from '@/atoms/userAtom';
import Button from '@/components/Button';

interface RecognitionSuccessProps {
  show: boolean;
}

const RecognitionSuccess = ({ show }: RecognitionSuccessProps) => {
  const navigate = useNavigate();
  const recognizedUserId = useAtomValue(recognizedUserIdAtom);

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo', recognizedUserId],
    queryFn: () => getUserInfo(recognizedUserId!),
    enabled: !!recognizedUserId,
  });

  const handleButtonClick = () => {
    void navigate('/');
  };

  if (isLoading || !userInfo) {
    return null;
  }

  return (
    <S.Container show={show}>
      <S.LottieWrapper show={show}>
        <DotLottieReact src={VerifyLottie} autoplay speed={1.5} />
      </S.LottieWrapper>
      <S.MessageWrapper show={show}>
        <S.SuccessTitle>인증 완료</S.SuccessTitle>
        <S.SuccessMessage>{userInfo.name}님, 환영합니다!</S.SuccessMessage>
        <Button onClick={handleButtonClick}>메인으로 이동</Button>
      </S.MessageWrapper>
    </S.Container>
  );
};

export default RecognitionSuccess;
