export type FaceDetectionStatus =
  | 'NO_DEVICE'
  | 'NO_PERMISSION'
  | 'NO_FACE'
  | 'MULTIPLE_FACES'
  | 'TOO_CLOSE_TO_EDGE'
  | 'TOO_SMALL'
  | 'FACE_TILTED'
  | 'VALID_FACE';
