import { Provider } from '@nestjs/common';
// Importamos o 'db' do nosso pacote!
import { db } from 'database';

// Um token único para injetar o Drizzle
export const DRIZZLE_PROVIDER_TOKEN = 'DRIZZLE_PROVIDER';

export const DrizzleProvider: Provider = {
  provide: DRIZZLE_PROVIDER_TOKEN,
  useValue: db, // O valor provido é a instância 'db' que exportamos
};