import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'env'; // Importa do seu novo pacote 'packages/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS (Opcional, mas você VAI precisar quando conectar o frontend)
  app.enableCors({
    origin: '*', // Em produção, mude para a URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Usa a porta validada pelo Zod (que é um number)
  await app.listen(env.PORT);
  console.log(`[Nest] Backend running on http://localhost:${env.PORT}`);
}
bootstrap();