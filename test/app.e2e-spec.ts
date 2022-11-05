process.env.DATABASE_URL = 'postgresql://root@localhost:26257/defaultdb';

import request from 'supertest';
import path from 'path';
import spawn from 'await-spawn';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DockerComposeEnvironment, Wait } from 'testcontainers';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';
import HealthcheckOkResponse from './fixtures/HealthcheckOkResponse.json';

describe('Users (e2e)', () => {
  let environment;
  let userService: UserService;
  let app: INestApplication;

  beforeAll(async () => {
    const composeFilePath = path.resolve(__dirname, '../');
    const composeFile = 'docker-compose.yml';

    // launch cockroach db in docker container
    environment = await new DockerComposeEnvironment(
      composeFilePath,
      composeFile,
    )
      .withWaitStrategy('crdb', Wait.forLogMessage('Container crdb-1 is ready'))
      .up(['crdb']);

    // run prisma migrations against docker
    console.log('Running prisma migrate...');
    const prismaOutput = await spawn('prisma', ['migrate', 'deploy']);
    console.log(`${prismaOutput}`);
  });

  beforeEach(() => {
    jest.setTimeout(120000);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = await module.get(UserService);

    app = await module
      .createNestApplication()
      .useGlobalPipes(new ValidationPipe())
      .init();
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
      .expect(200)
      .expect({
        data: {
          users: [],
        },
      });
  });

  it('test healthcheck success', async () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect(HealthcheckOkResponse);
  });

  it('test user service create', async () => {
    let results = await userService.findAll();
    expect(results.length).toEqual(0);

    const mockEmail = 'mock@gmail.com';
    await userService.create(mockEmail);

    results = await userService.findAll();
    expect(results.length).toEqual(1);
  });

  afterAll(async () => {
    await environment.down();
  });
});
