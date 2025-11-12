import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useCameraDevice, useFrameProcessor, runAtTargetFps } from 'react-native-vision-camera';
import { Face, useFaceDetector } from 'react-native-vision-camera-face-detector';
import { Worklets } from 'react-native-worklets-core';
import { FaceDetectionStatus } from '@/types/FaceDetectionStatus';
import { useFaceValidation } from './useFaceValidation';
import { usePermissionHandler } from './usePermissionHandler';
import { DETECTION_OPTIONS } from '@/constants/faceCaptureConfig';

export const useFaceDetection = () => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState<FaceDetectionStatus>('NO_FACE');

  const device = useCameraDevice('front');
  const { detectFaces } = useFaceDetector(DETECTION_OPTIONS);
  const { validateFace } = useFaceValidation();
  const { hasPermission, handlePermissionRequest } = usePermissionHandler();

  const validateFacialFeatures = useCallback(
    Worklets.createRunOnJS((faces: Face[], frameWidth: number, frameHeight: number) => {
      if (faces.length === 0) {
        setDetectionStatus('NO_FACE');
        setFaceDetected(false);
        return;
      }

      if (faces.length > 1) {
        setDetectionStatus('MULTIPLE_FACES');
        setFaceDetected(false);
        return;
      }

      const status = validateFace(faces[0], frameWidth, frameHeight);
      setDetectionStatus(status);
      setFaceDetected(status === 'VALID_FACE');
    }),
    [validateFace],
  );

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';

      runAtTargetFps(60, () => {
        'worklet';

        try {
          const faces = detectFaces(frame);
          validateFacialFeatures(faces, frame.width, frame.height);
        } catch {
          Alert.alert('얼굴 감지 실패', '얼굴 감지 중 오류가 발생했습니다.');
        }
      });
    },
    [validateFacialFeatures],
  );

  useEffect(() => {
    const checkPermission = async () => {
      const status = await handlePermissionRequest();
      if (status) {
        setDetectionStatus(status);
      }
    };

    checkPermission();
  }, [handlePermissionRequest]);

  useEffect(() => {
    if (!device) {
      setDetectionStatus('NO_DEVICE');
    }
  }, [device]);

  return {
    faceDetected,
    detectionStatus,
    device,
    hasPermission,
    frameProcessor,
  };
};
