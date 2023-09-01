import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 20000
      }
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'managers'), {
    prefix: '/managers/',
  });
  app.useStaticAssets(join(__dirname, '..', 'products'), {
    prefix: '/products/',
  });
  app.enableCors();
  
  await app.listen(3001);
}
bootstrap();
