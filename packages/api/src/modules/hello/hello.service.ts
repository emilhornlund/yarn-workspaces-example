import { Injectable } from '@nestjs/common';

import { greet } from '@app/common';

/**
 * Service for building greeting messages.
 */
@Injectable()
export class HelloService {
  /**
   * Builds a greeting message for the given name.
   *
   * @param name - The name to include in the greeting.
   * @returns A formatted greeting message.
   */
  getHello(name: string): string {
    return greet(name);
  }
}
