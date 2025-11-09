import { prisma } from '@/infrastructure/database/prisma';

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

export interface UserWithPreferences {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
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
}

export const userRepository = new UserRepository();
