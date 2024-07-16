import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { IApp } from './common/configuration';
import { ValidationCustomException } from './common/response';


async function start() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  const configApp = app.get(ConfigService).get<IApp>('app');
  const documentationConfig = new DocumentBuilder()
    .setTitle('Template Nest')
    .setDescription('Описание API Template Nest')
    .setVersion('3.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('docs', app, document);

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidUnknownValues: true,
      exceptionFactory: errors => new ValidationCustomException(errors),
    }),
  );
  await app.listen(configApp.port, configApp.address, () =>
    console.info(`Server started on port: ${configApp.port} by ${process.env.NODE_ENV} mode`),
  );
}
// eslint-disable-next-line unicorn/prefer-top-level-await
start();
