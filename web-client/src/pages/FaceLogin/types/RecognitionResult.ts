export interface RecognitionResult {
  success: boolean;
  user_id?: string;
  name?: string;
  confidence?: number;
  message: string;
}
