import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../src/app.module';
import { configureApp } from '../src/utils';

describe('HelloController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = configureApp(moduleFixture.createNestApplication());
    await app.init();
  });

  describe('/api/hello (GET)', () => {
    it('should return "Hello World!"', () => {
      return request(app.getHttpServer())
        .get('/api/hello')
        .expect(200)
        .expect({ message: 'Hello, World!' });
    });

    it('should return "Hello User!"', () => {
      return request(app.getHttpServer())
        .get('/api/hello')
        .query({ name: 'User' })
        .expect(200)
        .expect({ message: 'Hello, User!' });
    });
  });
});
