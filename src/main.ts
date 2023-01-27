import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;
  const HOST = '127.0.0.1';
  await app.listen(PORT, HOST, () => {
    console.log(`Server is working: ${HOST}:${PORT}`)
  });
}
bootstrap();
