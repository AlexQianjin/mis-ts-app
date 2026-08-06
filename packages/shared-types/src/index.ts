import { z } from 'zod';

export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean()
});

export type LoginInput = z.infer<typeof loginSchema>;

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type AuthUser = z.infer<typeof authUserSchema>;

export interface CurrentUserResponse {
  user: AuthUser;
}
