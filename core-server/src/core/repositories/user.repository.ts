import { prisma } from '@/infrastructure/database/prisma';

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserData) {
    return prisma.user.create({
      data,
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  async updatePassword(id: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}

export const userRepository = new UserRepository();
