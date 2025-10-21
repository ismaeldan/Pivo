import type { Config } from 'drizzle-kit';
import { env } from '../env';

export default {
  schema: './schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Usa a variável validada pelo Zod. Sem mais erros!
    url: env.DATABASE_URL,
  },
} satisfies Config;