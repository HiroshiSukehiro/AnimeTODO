import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('someword'));

  const PORT = process.env.PORT || 3000;
  const HOST = '127.0.0.1';
  await app.listen(PORT, HOST, () => {
    console.log(`Server is working: ${HOST}:${PORT}`)
  });
}
bootstrap();
