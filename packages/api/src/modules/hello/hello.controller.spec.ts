import { Test, TestingModule } from '@nestjs/testing';

import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('HelloController', () => {
  let appController: HelloController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    appController = app.get<HelloController>(HelloController);
  });

  describe('hello', () => {
    it('should return "Hello User!"', () => {
      expect(appController.getHello('User')).resolves.toEqual({
        message: 'Hello, User!',
      });
    });

    it('should return "Hello World!"', () => {
      expect(appController.getHello()).resolves.toEqual({
        message: 'Hello, World!',
      });
    });
  });
});
