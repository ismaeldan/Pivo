import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../env'; // Importa do seu novo pacote 'packages/env'
import * as schema from './schema';

// O cliente de conexão
const client = postgres(env.DATABASE_URL);

// Exporta a instância do Drizzle e o schema
export const db = drizzle(client, { schema });

// Exporta os tipos inferidos
export * from './schema';