import { Test, TestingModule } from '@nestjs/testing';
import { User, UserRole } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find all users', async () => {
    prisma.user.findMany = jest.fn().mockImplementationOnce(() => []);
    expect(await service.findAll()).toEqual([]);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it('should create a user', async () => {
    const mockEmail = 'test@gmail.com';

    const expectedUser = new User();
    expectedUser.email = mockEmail;
    expectedUser.role = UserRole.USER;

    prisma.user.create = jest.fn().mockImplementationOnce(() => undefined);
    expect(await service.create(mockEmail)).toEqual(undefined);

    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expectedUser,
    });
  });
});
