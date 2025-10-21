import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import Joi from 'joi';

import configuration, { ApiConfigService } from './config';
import { AllExceptionsFilter } from './filters';
import { HealthModule } from './modules/health';
import { HelloModule } from './modules/hello';
import { ValidationPipe } from './pipes';

/**
 * Root module of the API application.
 *
 * Configures global settings such as environment variables, validation,
 * exception handling, and registers feature modules.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        SERVER_PORT: Joi.number().port().default(3001),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    HealthModule,
    HelloModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    ApiConfigService,
  ],
  exports: [],
})
export class AppModule {}
