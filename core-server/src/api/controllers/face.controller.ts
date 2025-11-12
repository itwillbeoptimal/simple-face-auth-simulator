import { extractFaceEmbedding } from '@/infrastructure/external/ai-client';
import { BadRequestError, ErrorCode } from '@/shared/types/error';
import { asyncHandler } from '@/shared/utils/async-handler';
import { sendSuccess } from '@/shared/utils/response';

export const extractEmbedding = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    throw new BadRequestError('이미지 파일이 필요합니다', ErrorCode.INVALID_REQUEST);
  }

  const embedding = await extractFaceEmbedding(file.buffer);

  sendSuccess(
    res,
    {
      success: true,
      message: '얼굴 임베딩 추출 성공',
      embedding,
    },
    '얼굴 임베딩 추출 성공',
  );
});
