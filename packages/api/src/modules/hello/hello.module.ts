import { Module } from '@nestjs/common';

import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

/**
 * Module that encapsulates the Hello feature.
 *
 * Provides the `/hello` endpoint and related business logic.
 */
@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
