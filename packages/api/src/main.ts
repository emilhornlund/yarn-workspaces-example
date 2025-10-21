import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ApiConfigService } from './config';
import { configureApp } from './utils';

/**
 * Bootstraps the NestJS application.
 *
 * Sets up Swagger documentation, global configuration, and starts
 * the HTTP server on the configured port.
 */
(async () => {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const config = new DocumentBuilder()
    .setTitle('Yarn Workspaces Example')
    .setDescription(
      'An example monorepo setup showcasing NestJS api documentation',
    )
    .setVersion('1.0')
    .addTag('hello')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_docs', app, documentFactory);

  const configService = app.get(ApiConfigService);

  await app.listen(configService.serverPort);
})();
