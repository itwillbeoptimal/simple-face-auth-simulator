import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAtomValue } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import RecognitionSuccess from './components/RecognitionSuccess';
import * as S from './FaceLogin.styles';
import useFaceRecognition from './hooks/useFaceRecognition';
import BlurLottie from '@/assets/lotties/blur.lottie';
import { recognizedUserIdAtom } from '@/atoms/userAtom';
import LoginHeader from '@/components/LoginHeader';

const FaceLogin = () => {
  const { videoRef, canvasRef } = useFaceRecognition();
  const recognizedUserId = useAtomValue(recognizedUserIdAtom);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  useEffect(() => {
    if (!isInitialMount.current && recognizedUserId) {
      setTimeout(() => setShowSuccessScreen(true), 800);
      setTimeout(() => setShowSuccess(true), 1100);
    }
  }, [recognizedUserId]);

  if (recognizedUserId && showSuccessScreen) {
    return (
      <S.Container>
        <RecognitionSuccess show={showSuccess} />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <LoginHeader />
      <S.Title>얼굴 인증</S.Title>
      <S.Subtitle>화면 중앙에 얼굴을 위치시켜주세요</S.Subtitle>
      <S.VideoWrapper>
        <S.BlurLottieWrapper fadeOut={!!recognizedUserId}>
          <DotLottieReact
            src={BlurLottie}
            autoplay
            loop
            useFrameInterpolation={false}
            renderConfig={{
              devicePixelRatio: 1,
              autoResize: false,
            }}
          />
        </S.BlurLottieWrapper>
        <S.VideoContainer fadeOut={!!recognizedUserId}>
          <S.Video ref={videoRef} autoPlay playsInline />
          <S.Canvas ref={canvasRef} width={400} height={400} />
        </S.VideoContainer>
      </S.VideoWrapper>
      <S.GuideText fadeOut={!!recognizedUserId}>얼굴이 인식되면 자동으로 로그인됩니다</S.GuideText>
    </S.Container>
  );
};

export default FaceLogin;
