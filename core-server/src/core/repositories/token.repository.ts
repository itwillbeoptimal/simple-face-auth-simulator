import { prisma } from '@/infrastructure/database/prisma';

export interface CreateRefreshTokenData {
  userId: string;
  token: string;
  expiresAt: Date;
}

export class TokenRepository {
  async findByToken(token: string) {
    return prisma.refreshToken.findUnique({ where: { token } });
  }

  async create(data: CreateRefreshTokenData) {
    return prisma.refreshToken.create({ data });
  }

  async delete(token: string) {
    return prisma.refreshToken.deleteMany({ where: { token } });
  }

  async deleteExpired() {
    return prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }
}

export const tokenRepository = new TokenRepository();
