import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const mockUsers = [];

describe('UserResolver', () => {
  let resolver: UserResolver;
  let mockUserService;

  beforeEach(async () => {
    mockUserService = {
      findAll: jest.fn(() => mockUsers),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find users', async () => {
    expect(await resolver.findAll()).toEqual([]);
    expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
  });
});
