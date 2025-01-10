import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the 'uploads' folder
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL path prefix for accessing images
  });
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger API documentation setup
  const config = new DocumentBuilder()
    .setTitle('Art Shop API')
    .setDescription('API documentation for the Art Shop application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application on the configured port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
