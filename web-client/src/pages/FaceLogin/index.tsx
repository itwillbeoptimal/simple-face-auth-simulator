import { useAtomValue } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RecognitionSuccess from './components/RecognitionSuccess';
import * as S from './FaceLogin.styles';
import useFaceRecognition from './hooks/useFaceRecognition';
import { recognizedUserIdAtom } from '@/atoms/userAtom';

const FaceLogin = () => {
  const navigate = useNavigate();
  const { videoRef, canvasRef } = useFaceRecognition();
  const recognizedUserId = useAtomValue(recognizedUserIdAtom);
  const [showSuccess, setShowSuccess] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current && recognizedUserId) {
      void navigate('/food', { replace: true });
    }
    isInitialMount.current = false;
  }, []);

  useEffect(() => {
    if (!isInitialMount.current && recognizedUserId) {
      setTimeout(() => setShowSuccess(true), 300);
    }
  }, [recognizedUserId]);

  if (recognizedUserId) {
    return (
      <S.Container>
        <RecognitionSuccess show={showSuccess} />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.VideoContainer fadeOut={!!recognizedUserId}>
        <S.Video ref={videoRef} autoPlay playsInline />
        <S.Canvas ref={canvasRef} width={640} height={480} />
      </S.VideoContainer>
    </S.Container>
  );
};

export default FaceLogin;
