import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
     
      'http://192.168.1.25:8080',
      'http://localhost:8080',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: false, // set true only if you’re using cookies
  });

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 2000);
}
bootstrap();
