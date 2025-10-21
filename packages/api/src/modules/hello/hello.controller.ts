import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HelloDto } from '@app/common';

import { HelloService } from './hello.service';

/**
 * Controller for the `/hello` endpoint.
 *
 * Provides a simple greeting message with optional query parameters.
 */
@ApiTags('hello')
@Controller('/hello')
export class HelloController {
  /**
   * Creates an instance of `HelloController`.
   *
   * @param helloService - Service for building greeting messages.
   */
  constructor(private readonly helloService: HelloService) {}

  /**
   * Returns a greeting message.
   *
   * @param name - (optional) The name to include in the greeting.
   * @returns A DTO containing the greeting message.
   */
  @Get()
  async getHello(@Query('name') name?: string): Promise<HelloDto> {
    const message = this.helloService.getHello(name ?? 'World');
    return { message };
  }
}
