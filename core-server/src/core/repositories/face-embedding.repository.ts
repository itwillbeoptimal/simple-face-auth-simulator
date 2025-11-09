import { prisma } from '@/infrastructure/database/prisma';

export interface CreateFaceEmbeddingData {
  userId: string;
  embedding: number[];
}

export class FaceEmbeddingRepository {
  async findByUserId(userId: string) {
    return prisma.faceEmbedding.findUnique({ where: { userId } });
  }

  async create(data: CreateFaceEmbeddingData) {
    return prisma.faceEmbedding.create({ data });
  }

  async delete(userId: string) {
    return prisma.faceEmbedding.delete({ where: { userId } });
  }

  async findAll() {
    return prisma.faceEmbedding.findMany({
      select: {
        userId: true,
        embedding: true,
      },
    });
  }
}

export const faceEmbeddingRepository = new FaceEmbeddingRepository();
