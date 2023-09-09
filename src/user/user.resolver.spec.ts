import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@gmail.com',
    role: UserRole.USER
  }
];

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
    expect(await resolver.findAll()).toEqual(mockUsers);
    expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
  });
});
