import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvFile } from 'node:process';

import { loginSchema } from '@repo/shared-types';
import { betterAuth } from 'better-auth';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { getMigrations } from 'better-auth/db/migration';
import { Pool } from 'pg';

const environmentFile = resolve(process.env.INIT_CWD?.trim() || process.cwd(), '.env');
if (existsSync(environmentFile)) loadEnvFile(environmentFile);

const databaseURL = process.env.DATABASE_URL?.trim() || 'postgresql://mis:mis@localhost:5432/mis';
const baseURL = process.env.BETTER_AUTH_URL?.trim() || 'http://localhost:3000';
const webOrigin = process.env.WEB_ORIGIN?.trim() || 'http://localhost:5173';
const secret = process.env.BETTER_AUTH_SECRET?.trim();

if (!secret && process.env.NODE_ENV === 'production') {
  throw new Error('BETTER_AUTH_SECRET is required in production');
}

export const auth = betterAuth({
  appName: 'MIS Workspace',
  baseURL,
  database: new Pool({ connectionString: databaseURL }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8
  },
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== '/sign-in/email') return;

      const result = loginSchema.safeParse(context.body);
      if (!result.success) {
        throw new APIError('BAD_REQUEST', {
          message: result.error.issues[0]?.message || 'Invalid login details'
        });
      }
    })
  },
  secret: secret || 'mis-workspace-development-secret-change-me',
  trustedOrigins: [webOrigin]
});

export async function migrateAuthDatabase() {
  const { runMigrations } = await getMigrations(auth.options);
  await runMigrations();
}
