import { FaceDetectionOptions } from 'react-native-vision-camera-face-detector';
import { FaceDetectionStatus } from '@/types/FaceDetectionStatus';

export const FACE_VALIDATION_CONFIG = {
  MIN_BORDER_DISTANCE: 96,
  MIN_FACE_SIZE_RATIO: 0.3,
  FACE_YAW_THRESHOLD: 15,
  FACE_PITCH_THRESHOLD: 10,
  FACE_ROLL_THRESHOLD: 10,
} as const;

export const DETECTION_OPTIONS: FaceDetectionOptions = {
  performanceMode: 'accurate',
  landmarkMode: 'all',
  classificationMode: 'all',
} as const;

export const GUIDE_MESSAGES: Record<FaceDetectionStatus, string> = {
  NO_DEVICE: '카메라를 감지하지 못했습니다',
  NO_PERMISSION: '카메라 권한이 필요합니다',
  MULTIPLE_FACES: '여러 명이 감지되었습니다.',
  TOO_SMALL: '얼굴이 너무 작습니다',
  FACE_TILTED: '얼굴을 정면을 향하게 해주세요',
  TOO_CLOSE_TO_EDGE: '얼굴이 화면 가장자리에 너무 가깝습니다',
  VALID_FACE: '얼굴이 감지되었습니다',
  NO_FACE: '영역 안에 얼굴을 맞춰주세요',
} as const;
