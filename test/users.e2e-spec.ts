import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgreSQLConfig } from '../configs/postgresql.config';
import { UsersModule } from '../src/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: PostgreSQLConfig,
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'usersaq' })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: 'usersaq',
      // Other expected properties
    });
  });

  it('/users (GET) should return an array of users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    // Add more assertions if needed
  });
});
