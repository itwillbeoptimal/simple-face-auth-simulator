import React, { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';
import LottieView from 'lottie-react-native';
import * as S from './FaceRegistrationStep.styles';
import Button from '@/components/Button';
import SkipButton from '@/screens/SignUp/components/SkipButton';
import ShieldIcon from '@/assets/icons/shield.svg';
import FaceImage from '@/assets/images/face.png';
import BlurredFaceImage from '@/assets/images/blurred-face.png';
import VerifyLottie from '@/assets/lotties/verify.json';

interface FaceRegistrationStepProps {
  onNext: () => void;
  onSkip: () => void;
}

const FaceRegistrationStep: React.FC<FaceRegistrationStepProps> = ({ onNext, onSkip }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const lottieOpacity = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);
  const theme = useTheme();

  const playAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(lottieOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 1600);
  }, [fadeAnim, lottieOpacity]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();

    playAnimation();

    const interval = setInterval(() => {
      fadeAnim.setValue(1);
      lottieOpacity.setValue(0);
      if (lottieRef.current) {
        lottieRef.current.reset();
      }
      playAnimation();
    }, 4000);

    return () => clearInterval(interval);
  }, [fadeAnim, playAnimation, slideAnim, lottieOpacity]);

  return (
    <S.Container>
      <S.Form>
        <S.Title weight="SEMI_BOLD">얼굴 등록</S.Title>
        <S.Subtitle>얼굴 정보를 등록하면 빠르게 입장할 수 있어요</S.Subtitle>
        <S.SafetyMessageWrapper>
          <ShieldIcon fill={theme.COLORS.LABEL.SECONDARY} />
          <S.SafetyMessage>촬영된 사진은 안전하게 변환된 후 저장됩니다.</S.SafetyMessage>
        </S.SafetyMessageWrapper>
        <S.ContentWrapper>
          <S.ImageWrapper style={{ transform: [{ translateX: slideAnim }] }}>
            <S.StyledImage source={FaceImage} />
            <S.BlurredImage source={BlurredFaceImage} style={{ opacity: fadeAnim }} />
            <Animated.View
              style={{
                opacity: lottieOpacity,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-37.4%',
                marginLeft: '-22%',
                width: '44%',
                height: '44%',
              }}
            >
              <S.StyledLottieView ref={lottieRef} source={VerifyLottie} loop={false} />
            </Animated.View>
          </S.ImageWrapper>
        </S.ContentWrapper>
      </S.Form>
      <S.ButtonWrapper>
        <SkipButton onPress={onSkip} />
        <Button title="얼굴 등록하기" onPress={onNext} />
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default FaceRegistrationStep;
