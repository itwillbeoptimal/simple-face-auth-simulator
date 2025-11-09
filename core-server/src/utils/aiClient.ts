import axios from 'axios';
import FormData from 'form-data';
import { BadRequestError, ErrorCode } from '@/types/error';

const AI_SERVER_URL = process.env.AI_SERVER_URL || 'http://localhost:8000';

interface FaceEmbeddingResponse {
  success: boolean;
  message: string;
  embedding: number[] | null;
}

export const extractFaceEmbedding = async (imageBuffer: Buffer): Promise<number[]> => {
  try {
    const formData = new FormData();
    formData.append('file', imageBuffer, {
      filename: 'face.jpg',
      contentType: 'image/jpeg',
    });

    const response = await axios.post<FaceEmbeddingResponse>(
      `${AI_SERVER_URL}/api/face/extract-embedding`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 10000,
      },
    );

    if (!response.data.success || !response.data.embedding) {
      throw new BadRequestError(
        response.data.message || '얼굴 임베딩 추출에 실패했습니다',
        ErrorCode.FACE_EXTRACTION_FAILED,
      );
    }

    return response.data.embedding;
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      throw new BadRequestError('AI 서버 호출 실패', ErrorCode.AI_SERVER_ERROR);
    }

    throw error;
  }
};
