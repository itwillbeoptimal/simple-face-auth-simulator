export const config = {
  jwt: {
    secret: process.env.JWT_SECRET ?? 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? 60 * 60,
  },
  refreshToken: {
    expiryDays: 30,
  },
  aiServer: {
    url: process.env.AI_SERVER_URL || 'http://localhost:8000',
  },
} as const;
