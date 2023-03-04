import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';
import { PrismaClient } from '@prisma/client';

describe('App (e2e)', () => {
  let userService: UserService;
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = await module.get(UserService);

    prisma = new PrismaClient();

    app = await module
      .createNestApplication()
      .useGlobalPipes(new ValidationPipe())
      .init();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('test users graphql query', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{
                users {
                    id
                  }
                }`,
      })
      .expect(200);
  });

  it('test healthcheck success', async () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        status: 'ok',
        info: {
          database: {
            status: 'up',
          },
        },
        error: {},
        details: {
          database: {
            status: 'up',
          },
        },
      });
  });

  it('test user service create', async () => {
    const mockEmail = 'mock-e2etest@gmail.com';

    let results = await userService.findAll();
    expect(results.length).toEqual(0);

    await userService.create(mockEmail);
    results = await userService.findAll();
    expect(results.length).toEqual(1);

    await userService.deleteByEmail(mockEmail);
    results = await userService.findAll();
    expect(results.length).toEqual(0);
  });
});
