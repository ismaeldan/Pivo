import { Module } from '@nestjs/common';
import { DrizzleProvider } from './drizzle.provider';

@Module({
  providers: [DrizzleProvider],
  exports: [DrizzleProvider], // Exporta para outros módulos usarem
})
export class DrizzleModule {}