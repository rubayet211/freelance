import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(8000);
}
bootstrap();
