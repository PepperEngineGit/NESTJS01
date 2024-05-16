import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  try {
    await app.listen(3000);
    console.log(
      `🍍🍍🍍 [Welcome to PARADISE ISLAND !! http://localhost:3000] 🍍🍍🍍`,
    );
  } catch (error) {
    console.log(`💥💥💥 [PARADISE ISLAND is OVER] 💥💥💥 :\n`, error);
  }
}
bootstrap();
