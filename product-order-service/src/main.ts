import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Enable validation globally

  app.enableCors();

  app.setGlobalPrefix('api');


  await app.listen(8000);
}
bootstrap();
