// import 'dotenv/config'; // <-- REMOVA ESTA LINHA SIMPLES

import { z } from 'zod';
import dotenv from 'dotenv'; // <-- IMPORTE O PACOTE 'dotenv' COMPLETO
import path from 'node:path'; // <-- IMPORTE O MÓDULO 'path' (nativo do Node)

// PASSO 1: Diga ao dotenv para carregar o .env da RAIZ DO MONOREPO
// (process.cwd() será 'packages/database', então '../..' sobe para 'Pivo/')
dotenv.config({
  path: path.resolve(process.cwd(), '../../.env'),
});

// PASSO 2: Define o schema (O resto do arquivo é IDÊNTICO)
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  DATABASE_URL: z.string().url().startsWith('postgresql://', 'Invalid Postgres URL'),
  
  PORT: z.coerce.number().default(3001), 
});

// PASSO 3: Valida o process.env
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  // Adiciona a pasta atual ao erro para facilitar o debug
  console.error('CWD (Current Working Directory):', process.cwd()); 
  throw new Error('Invalid environment variables.');
}

// PASSO 4: Exporta as variáveis validadas e tipadas
export const env = _env.data;