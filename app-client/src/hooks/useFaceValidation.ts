import { useCallback } from 'react';
import { Face } from 'react-native-vision-camera-face-detector';
import { FaceDetectionStatus } from '@/types/FaceDetectionStatus';
import { FACE_VALIDATION_CONFIG } from '@/constants/faceCaptureConfig';

export const useFaceValidation = () => {
  const validateFace = useCallback(
    (face: Face, frameWidth: number, frameHeight: number): FaceDetectionStatus => {
      const {
        MIN_BORDER_DISTANCE,
        MIN_FACE_SIZE_RATIO,
        FACE_YAW_THRESHOLD,
        FACE_PITCH_THRESHOLD,
        FACE_ROLL_THRESHOLD,
      } = FACE_VALIDATION_CONFIG;

      if (!face.landmarks) {
        return 'NO_FACE';
      }

      const isTooCloseToEdge =
        face.bounds.x < MIN_BORDER_DISTANCE ||
        face.bounds.y < MIN_BORDER_DISTANCE ||
        face.bounds.x + face.bounds.width > frameWidth - MIN_BORDER_DISTANCE ||
        face.bounds.y + face.bounds.height > frameHeight - MIN_BORDER_DISTANCE;

      if (isTooCloseToEdge) {
        return 'TOO_CLOSE_TO_EDGE';
      }

      const minFaceWidth = frameWidth * MIN_FACE_SIZE_RATIO;
      if (face.bounds.width < minFaceWidth) {
        return 'TOO_SMALL';
      }

      const isFaceTilted =
        (face.yawAngle && Math.abs(face.yawAngle) > FACE_YAW_THRESHOLD) ||
        (face.pitchAngle && Math.abs(face.pitchAngle) > FACE_PITCH_THRESHOLD) ||
        (face.rollAngle && Math.abs(face.rollAngle) > FACE_ROLL_THRESHOLD);

      if (isFaceTilted) {
        return 'FACE_TILTED';
      }

      return 'VALID_FACE';
    },
    [],
  );

  return { validateFace };
};
