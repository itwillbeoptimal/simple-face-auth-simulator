import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera } from 'react-native-vision-camera';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from 'styled-components/native';
import type { NavigationProp, RouteProps } from '@/types/Navigation';
import { useFaceDetection } from '@/hooks/useFaceDetection';
import { validateFaceImage } from '@/apis/authApi';
import * as S from './FaceCapture.styles';
import SafeLayout from '@/components/SafeLayout';
import Header from '@/components/Header';
import { GUIDE_MESSAGES } from '@/constants/faceCaptureConfig';

type ProcessStatus = 'idle' | 'extracting' | 'completed';

const FaceCapture: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<'FaceCapture'>>();
  const route = useRoute<RouteProps<'FaceCapture'>>();

  const [isCapturing, setIsCapturing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processStatus, setProcessStatus] = useState<ProcessStatus>('idle');

  const cameraRef = useRef<Camera>(null);

  const { faceDetected, detectionStatus, device, hasPermission, frameProcessor } =
    useFaceDetection();

  const isCaptureEnabled = useMemo(() => faceDetected && !isCapturing, [faceDetected, isCapturing]);

  const handleCapture = useCallback(async () => {
    if (!isCaptureEnabled || !cameraRef.current) {
      return;
    }

    try {
      setIsCapturing(true);
      setProgress(0);
      setProcessStatus('idle');
      const photo = await cameraRef.current.takePhoto({});

      setProgress(50);
      setProcessStatus('extracting');

      const photoFile = {
        uri: `file://${photo.path}`,
        type: 'image/jpeg',
        name: 'face.jpg',
      };

      const validationResult = await validateFaceImage(photoFile);

      setProgress(100);
      setProcessStatus('completed');

      if (!validationResult.success) {
        Alert.alert('얼굴 인식 실패', validationResult.message);
        setProgress(0);
        setProcessStatus('idle');
        return;
      }

      Alert.alert('얼굴 등록 성공', '얼굴이 성공적으로 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            const returnTo = route.params?.returnTo;
            if (returnTo === 'SignUp') {
              navigation.navigate('SignUp', { capturedFace: photoFile });
            }
          },
        },
      ]);
    } catch {
      Alert.alert('얼굴 특징 추출 실패', '특징을 추출하지 못했습니다. 다시 촬영해 주세요.');
      setProgress(0);
      setProcessStatus('idle');
    } finally {
      setIsCapturing(false);
    }
  }, [isCaptureEnabled, navigation, route.params?.returnTo]);

  const isCameraReady = hasPermission && device;

  const message = useMemo(() => {
    if (processStatus === 'extracting') {
      return '얼굴 특징을 추출하고 있어요';
    }
    if (processStatus === 'completed') {
      return '등록이 완료되었습니다';
    }
    return GUIDE_MESSAGES[detectionStatus];
  }, [processStatus, detectionStatus]);

  const screenWidth = Dimensions.get('window').width;
  const cameraSize = screenWidth - 60;
  const progressSize = screenWidth - 20;

  return (
    <SafeLayout>
      <Header title="얼굴 촬영" />
      <S.Container>
        <S.GuideArea>
          <S.GuideText weight="MEDIUM">{message}</S.GuideText>
        </S.GuideArea>
        <S.CameraArea>
          <S.ProgressContainer style={{ width: progressSize, height: progressSize }}>
            <AnimatedCircularProgress
              size={progressSize}
              backgroundWidth={2}
              width={6}
              fill={progress}
              backgroundColor={theme.COLORS.LABEL.TERTIARY}
              tintColor={theme.COLORS.MAIN.PRIMARY}
              rotation={0}
              lineCap="round"
              duration={300}
            />
            <S.CameraContainer style={{ width: progressSize, height: progressSize }}>
              <S.CameraWrapper size={cameraSize}>
                {isCameraReady && device ? (
                  <S.CameraView
                    ref={cameraRef}
                    device={device}
                    isActive
                    frameProcessor={frameProcessor}
                    photo
                  />
                ) : (
                  <S.EmptyView />
                )}
              </S.CameraWrapper>
            </S.CameraContainer>
          </S.ProgressContainer>
        </S.CameraArea>
        <S.ControlArea>
          <S.CaptureButton
            onPress={handleCapture}
            disabled={!isCaptureEnabled}
            active={isCaptureEnabled}
          >
            <S.CaptureButtonInner active={isCaptureEnabled} />
          </S.CaptureButton>
        </S.ControlArea>
      </S.Container>
    </SafeLayout>
  );
};

export default FaceCapture;
