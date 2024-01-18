import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('Vocabulary')
    .setDescription(
      'A program for memorizing foreign words using the Leitner system',
    )
    .setVersion('1.0')
    .addTag('cards')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      'access-key',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
  );
  await app.listen(port, () => {
    Logger.log(`${port}`);
  });
}

bootstrap().then(() => Logger.log('APP START SUCCESSFUL'));
