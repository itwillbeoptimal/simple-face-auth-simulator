import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '@/infrastructure/config/env';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwt.secret, { expiresIn: config.jwt.expiresIn as number });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, config.jwt.secret) as { userId: string };
};
