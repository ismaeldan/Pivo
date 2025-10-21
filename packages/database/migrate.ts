import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from '../env'; // Importa do seu novo pacote 'packages/env'

console.log('Running migrations...');

// Cliente de conexão SÓ PARA A MIGRAÇÃO
const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
const db = drizzle(migrationClient);

// Roda a migração
migrate(db, { migrationsFolder: './migrations' })
  .then(() => {
    console.log('Migrations applied successfully!');
  })
  .catch((err) => {
    console.error('Error applying migrations:', err);
    process.exit(1);
  })
  .finally(async () => {
    // Fecha a conexão
    await migrationClient.end();
    process.exit(0);
  });