import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { FaceDetectionStatus } from '@/types/FaceDetectionStatus';

export const usePermissionHandler = () => {
  const { hasPermission, requestPermission } = useCameraPermission();

  const handlePermissionRequest = useCallback(async (): Promise<FaceDetectionStatus | null> => {
    try {
      if (!hasPermission) {
        const permission = await requestPermission();
        if (!permission) {
          Alert.alert('카메라 권한 필요', '얼굴 인식 기능을 사용하려면 카메라 권한이 필요합니다.', [
            { text: '취소', style: 'cancel' },
            {
              text: '확인',
              onPress: () => Linking.openSettings(),
            },
          ]);
          return 'NO_PERMISSION';
        }
      }
      return null;
    } catch {
      Alert.alert('카메라 오류', '카메라 권한을 요청하는 중 문제가 발생했습니다.');
      return 'NO_PERMISSION';
    }
  }, [hasPermission, requestPermission]);

  return { hasPermission, handlePermissionRequest };
};
